import {useQuery} from "@tanstack/react-query";
import {queryClient} from "../api/queryClient";
import {fetchMe} from "../api/User";
import {Layout} from "../components/Layout";
import {Loader} from "../components/Loader";
import {AuthForm} from "../components/AuthForm";
import {NoteForm} from "../components/NoteForm";
import {NotesListView} from "../components/NotesListView";
import {FC} from "react";

export const Account: FC = () => {
    const queryAccount = useQuery({
        queryFn: () => fetchMe(),
        queryKey: ["me"],
    }, queryClient);

    switch(queryAccount.status) {
        case "pending":
            return <Loader/>
        case "success":
            return <Layout>
                        <NoteForm/>
                        <NotesListView/>
                    </Layout>
        case "error":
            return <AuthForm/>
    }
}
