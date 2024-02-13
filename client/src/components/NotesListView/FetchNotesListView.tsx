import {FC, useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {fetchNotesList} from "../../api/Note";
import {queryClient} from "../../api/queryClient";
import {Loader} from "../Loader";
import {NotesListView} from "./NotesListView";
import {PageSelector} from "../PageSelector";

export const FetchNotesListView: FC = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [canSelectNext, setCanSelectNext] = useState(false);
    const [canSelectPrev, setCanSelectPrev] = useState(false);

    const notesListQuery = useQuery({
        queryFn: () => fetchNotesList(currentPage),
        queryKey: ["notes", currentPage],
    }, queryClient);

    function onNextClick() {
        setCurrentPage((prevState) => prevState + 1);
    }
    function onPrevClick() {
        setCurrentPage((prevState) => prevState - 1);
    }

    useEffect(() => {
        if (currentPage < notesListQuery.data?.pageCount - 1) {
            setCanSelectNext(true);
        } else {
            setCanSelectNext(false);
        }
        if (currentPage > 0) {
            setCanSelectPrev(true);
        } else {
            setCanSelectPrev(false);
        }
    }, [currentPage, notesListQuery.data?.pageCount]);

    switch (notesListQuery.status) {
        case "pending":
            return <Loader />;
        case "success":
            return <div>
                    <NotesListView notesList={notesListQuery.data.list} />
                    <PageSelector
                        currentPage={currentPage}
                        onNextClick={onNextClick}
                        onPrevClick={onPrevClick}
                        canSelectNext={canSelectNext}
                        canSelectPrev={canSelectPrev}
                    />
                   </div>;
        case "error":
            return <div>
                    <span>Произошла ошибка :(</span>
                    <button onClick={() => notesListQuery.refetch()}>Повторить запрос</button>
                   </div>
    }
}
