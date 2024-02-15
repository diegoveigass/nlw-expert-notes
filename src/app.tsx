import { SignIn, useUser } from '@clerk/clerk-react'
import { Home } from './pages/home'

export function App() {
  const { isSignedIn } = useUser()

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center h-screen">
        <SignIn />
      </div>
    )
  }

  return <Home />
}
