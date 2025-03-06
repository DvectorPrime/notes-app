import { createContext, useState, useContext } from "react";

// Creating a new context for app data and storing it in the AppDataContext variable
const AppDataContext = createContext();

// Defining a context provider component named 'AppDataProvider'
export const AppDataProvider = ({ children }) => {
  // Using the useState hook to initialize and manage the currentUser and theme Variables 
  const [currentUser, setCurrentUser] = useState("");
  const [theme, setTheme] = useState("light");

  // Returning the provider component to make the app data available to child components
  return (
    <AppDataContext.Provider
      value={{ currentUser, setCurrentUser, theme, setTheme }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

// Defining a custom hook named 'useAppData' to provide an easier way to access the AppDataContext
export const useAppData = () => useContext(AppDataContext);