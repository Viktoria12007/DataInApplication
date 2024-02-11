import {useQuery} from "@tanstack/react-query";
import {queryClient} from "../../api/queryClient";
import {fetchMe} from "../../api/User";
import {Layout} from "../Layout";
import {Loader} from "../Loader";
import {AuthForm} from "../AuthForm";
import {NoteForm} from "../NoteForm";
import {NotesListView} from "../NotesListView";
import {FC} from "react";
import {LogoutButton} from "../LogoutButton";
import {UserView} from "../UserView";

export const Account: FC = () => {
    const accountQuery = useQuery({
        queryFn: () => fetchMe(),
        queryKey: ["me"],
    }, queryClient);

    switch(accountQuery.status) {
        case "pending":
            return <Loader/>
        case "success":
            return <Layout>
                    <UserView username={accountQuery.data.username}/>
                    <NoteForm/>
                    <NotesListView/>
                    <LogoutButton/>
                   </Layout>
        case "error":
            return <AuthForm/>
    }
}
