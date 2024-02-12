import { FormField } from "../FormField";
import { Button } from "../Button";
import "./NoteForm.css";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "../../api/queryClient";
import {createNote} from "../../api/Note";

export const NoteForm = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const noteFormMutation = useMutation({
        mutationFn: () => createNote(title, text),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        }
    }, queryClient);

    function handleSubmit(e) {
        e.preventDefault();
        noteFormMutation.mutate();
    }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <FormField label="Заголовок">
        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" />
      </FormField>
      <FormField label="Текст">
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
      </FormField>
      { noteFormMutation.error && <span>{noteFormMutation.error.message}</span> }
      <Button type="submit" isLoading={noteFormMutation.isPending}>Сохранить</Button>
    </form>
  );
};
