import {validateResponse} from "./validateResponse";
import {z} from "zod";

const NoteSchema = z.object({
    id: z.string(),
    title: z.string(),
    text: z.string(),
    userId: z.string(),
    createdAt: z.number(),
});
export type Note = z.infer<typeof NoteSchema>;

const NotesListSchema = z.array(NoteSchema);
export type NotesList = z.infer<typeof NotesListSchema>;

const FetchNotesList = z.object({
    list: NotesListSchema,
    pageCount: z.number(),
})
type FetchNotesList = z.infer<typeof FetchNotesList>;

export function fetchNotesList(): Promise<FetchNotesList> {
    return fetch('/api/notes')
        .then(validateResponse)
        .then((response) => response.json())
        .then((data) => FetchNotesList.parse(data));
}

export function createNote(title: string, text: string): Promise<void> {
    return fetch('/api/notes', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, text }),
    })
        .then(validateResponse)
        .then(() => undefined);
}
