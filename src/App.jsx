import './App.css'
import Login from './components/login'
import TabSection from './components/Tabsection'
import MainApp from './mainApp'

import { UserProvider } from './context/CurrentUserContext'

function App() {
  /* This is where routing will occur */

  return (
    <UserProvider>
      <Login />
    </UserProvider>
  )
}

export default App
