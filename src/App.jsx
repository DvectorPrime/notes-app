import './App.css'
import Login from './components/login'
import TabSection from './components/Tabsection'
import MainApp from './mainApp'
import NoteSection from './components/NoteSection'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AppDataProvider } from './context/CurrentUserContext'

function App() {
  /* This is where routing will occur */

  const router = createBrowserRouter([
    {
      path: "/",
      element: <TabSection />
    },
    {
      path: "/notes",
      element: <NoteSection />
    },
    {
      path: "/login",
      element: <Login />,
    }
  ])

  return (
    <AppDataProvider>
      <RouterProvider router={router} />
    </AppDataProvider>
  )
}

export default App
