import "./NotesListView.css";
import { NoteView } from "../NoteView";
import {FC} from "react";
import {PageSelector} from "../PageSelector";
import {NotesList} from "../../api/Note";

interface NotesListViewProps {
    notesList: NotesList,
}

export const NotesListView: FC<NotesListViewProps> = ({ notesList }) => {
  return (
    <div>
      <ul className="note-list-view">
          { notesList.map((note) => {
              return (
                  <li key={note.id}>
                      <NoteView note={note} />
                  </li>
                )
              }
          )}
      </ul>
      <PageSelector />
    </div>
  );
};
