import { FormField } from "../FormField";
import { Button } from "../Button";
import "./NoteForm.css";
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "../../api/queryClient";
import {createNote} from "../../api/Note";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const NoteFormSchema = z.object({
    title: z.string().min(5, 'Заголовок заметки должен содержать не менее 5 символов'),
    text: z.string().min(10, 'Текст заметки должен содержать не менее 10 символов').max(300,'Заголовок заметки должен содержать не более 300 символов'),
});
type NoteForm = z.infer<typeof NoteFormSchema>;

export const NoteForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<NoteForm>({
        resolver: zodResolver(NoteFormSchema),
    });

    const noteFormMutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
    }, queryClient);

  return (
    <form className="note-form" onSubmit={handleSubmit((newNote) => {
        noteFormMutation.mutate(newNote);
        reset();
    })}>
      <FormField label="Заголовок" errorMessage={errors.title?.message}>
        <input type="text" {...register("title")} />
      </FormField>
      <FormField label="Текст" errorMessage={errors.text?.message}>
        <textarea {...register("text")} />
      </FormField>
      { noteFormMutation.error && <span>{noteFormMutation.error.message}</span> }
      <Button type="submit" isLoading={noteFormMutation.isPending}>Сохранить</Button>
    </form>
  );
};
