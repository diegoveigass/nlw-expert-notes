import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteNote } from '../api/delete-note'
import { useUser } from '@clerk/clerk-react'

import * as Dialog from '@radix-ui/react-dialog'
import { toast } from 'sonner'

interface DeleteNoteButtonProps {
  noteId: string
}

export function DeleteNoteButton({ noteId }: DeleteNoteButtonProps) {
  const { user } = useUser()
  const queryClient = useQueryClient()

  const { mutateAsync: deleteNoteFn } = useMutation({
    mutationFn: deleteNote,

    async onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['notes', user?.id] })
    },
  })

  function handleDeleteNote(noteId: string) {
    deleteNoteFn({ noteId })

    toast.success('Nota deletada com sucesso!')
  }

  return (
    <Dialog.Close asChild>
      <button
        className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group"
        type="button"
        onClick={() => handleDeleteNote(noteId)}
      >
        Deseja{' '}
        <span className="text-red-400 group-hover:underline">
          apagar essa nota
        </span>
        ?
      </button>
    </Dialog.Close>
  )
}
