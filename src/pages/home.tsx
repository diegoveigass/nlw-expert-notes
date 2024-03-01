import { ChangeEvent, useState } from 'react'
import logo from '../assets/logo-nlw-expert.svg'
import { NewNoteCard } from '../components/new-note-card'
import { NoteCard } from '../components/note-card'
import { UserButton, useUser } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import { getNotes } from '../api/get-notes'

export function Home() {
  const [search, setSearch] = useState('')

  const { user } = useUser()

  const { data: notes } = useQuery({
    queryKey: ['notes', user?.id],
    queryFn: () => getNotes({ clerkUserId: user?.id }),
  })

  // async function onNoteCreated(content: string) {
  //   const response = await api.post<Note>('/notes', {
  //     date: new Date(),
  //     content,
  //     clerkUserId: user?.id,
  //   })

  //   const newNote = {
  //     id: response.data.id,
  //     date: new Date(),
  //     content,
  //   }

  //   const notesArray = [newNote, ...notes]

  //   setNotes(notesArray)

  //   localStorage.setItem('@nlw-expert/notes', JSON.stringify(notesArray))
  // }

  // function onNoteDeleted(id: string) {
  //   const notesArray = notes.filter((note) => note.id !== id)

  //   setNotes(notesArray)

  //   localStorage.setItem('@nlw-expert/notes', JSON.stringify(notesArray))
  // }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value

    setSearch(query)
  }

  const filteredNotes =
    search !== ''
      ? notes?.filter((note) =>
          note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
        )
      : notes

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <div className="flex items-center justify-between">
        <img src={logo} alt="NLW Expert" />
        <UserButton appearance={{ layout: { shimmer: true } }} />
      </div>

      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6">
        <NewNoteCard />

        {filteredNotes &&
          filteredNotes.map((note) => {
            return <NoteCard key={note.id} note={note} />
          })}
      </div>
    </div>
  )
}
