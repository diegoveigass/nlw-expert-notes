import { api } from '../lib/axios'

interface GetNotesProps {
  clerkUserId: string | undefined
}

export interface Note {
  content: string
  id: string
  created_at: string
}

export async function getNotes({ clerkUserId }: GetNotesProps) {
  const response = await api.post<Note[]>('/note', { clerkUserId })

  return response.data
}
