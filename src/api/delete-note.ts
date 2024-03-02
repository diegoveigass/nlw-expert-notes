import { api } from '../lib/axios'

export interface DeleteNoteParams {
  noteId: string
}

export async function deleteNote({ noteId }: DeleteNoteParams) {
  await api.delete(`/note/${noteId}`)
}
