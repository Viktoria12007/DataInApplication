import {FC} from "react";
import {useQuery} from "@tanstack/react-query";
import {fetchNotesList} from "../../api/Note";
import {queryClient} from "../../api/queryClient";
import {Loader} from "../Loader";
import {NotesListView} from "./NotesListView";

export const FetchNotesListView: FC = () => {
    const notesListQuery = useQuery({
       queryFn: () => fetchNotesList(),
       queryKey: ["notes"],
    }, queryClient);

    switch (notesListQuery.status) {
        case "pending":
            return <Loader />;
        case "success":
            return <NotesListView notesList={notesListQuery.data.list} />;
        case "error":
            return <div>
                    <span>Произошла ошибка :(</span>
                    <button onClick={() => notesListQuery.refetch()}>Повторить запрос</button>
                   </div>
    }
}
