import { createContext, useState, useContext } from "react";

import { collection, query, onSnapshot } from 'firebase/firestore';

import { db } from '../firebase/firebaseConfig';

// Creating a new context for app data and storing it in the AppDataContext variable
const AppDataContext = createContext();

// Defining a context provider component named 'AppDataProvider'
export const AppDataProvider = ({ children }) => {
  // Using the useState hook to initialize and manage the important variables
  const [notesInfo, setNotesInfo] = useState([])
  
  const [currentUser, setCurrentUser] = useState("");
  
  const [theme, setTheme] = useState("light");
  
  const [currentNote, setCurrentNote] = useState("")

  function receiveUpdates(){
    if (currentUser !== ""){
        const holderNotes = []
        const notesQuery = query(collection(db, currentUser.uid));
        const unsubscribe = onSnapshot(notesQuery, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            holderNotes.push(doc.data());
        });
        setNotesInfo(holderNotes)
        unsubscribe()
    })}   
}

  // Returning the provider component to make the app data available to child components
  return (
    <AppDataContext.Provider
      value={{notesInfo, setNotesInfo, currentUser, setCurrentUser, theme, setTheme, currentNote, setCurrentNote, receiveUpdates }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

// Defining a custom hook named 'useAppData' to provide an easier way to access the AppDataContext
export const useAppData = () => useContext(AppDataContext);