import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app'
import { Toaster } from 'sonner'
import { ClerkProvider } from '@clerk/clerk-react'

import './index.css'
import { dark } from '@clerk/themes'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={{ baseTheme: dark }}
    >
      <App />
      <Toaster richColors />
    </ClerkProvider>
  </React.StrictMode>,
)
