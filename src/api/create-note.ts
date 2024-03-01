import { api } from '../lib/axios'

export interface CreateNoteBody {
  date: string
  content: string
  clerkUserId: string
}

export async function createNote({
  date,
  clerkUserId,
  content,
}: CreateNoteBody) {
  await api.post('/notes', {
    date,
    clerkUserId,
    content,
  })
}
