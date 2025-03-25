import { useEffect, useState, } from 'react';

import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';

import { db } from '../firebase/firebaseConfig';

import Tab from './singleComponents/tab';
import ToggleTheme from './singleComponents/toggleTheme';
import './tabs.css';

import addSign from '../assets/add-sign.svg'
import menuBar from '../assets/menu-bar.svg'
import closeIcon from '../assets/close.svg'
import logo from '../assets/logo.png'

import { useAppData } from '../context/CurrentUserContext';
import { useNavigate } from 'react-router-dom';


function TabSection({noteTabSection}) {
    const {currentUser, setCurrentUser, notesInfo, setNotesInfo, receiveUpdates, setCurrentNote, theme} = useAppData();

    const userPhotoURL = currentUser.photoURL

    //Update Note Info in User Context
    async function getNotes() {
        const noteSnapShots = await getDocs(collection(db, currentUser.uid));
        if (notesInfo.length === 0){
            noteSnapShots.forEach((doc) => {
                setNotesInfo(prev => [...prev, doc.data()]);
            });
        }
    }

    //Ensure User Authentication
    useEffect(() => {
        if (!currentUser.uid){
            navigate("/login")
            return
        } else {
            getNotes()
        }
    }, [currentUser.uid])

    const navigate = useNavigate()
    
    const [displayNotes, setDisplayNotes] = useState(notesInfo) //to manage what is displayed to the user
    const [currentsearch, setCurrentSearch] = useState("") //Holds state of user note search
    
    /* To ensure that notes displayed are those specified by user when user to making changes to note category */
    useEffect(() => {
        if (currentsearch.substring(0, 1) === ":"){
            setDisplayNotes(notesInfo.filter(note => {
                const noteCategory = note.category ? (note.category).toLowerCase() : "none"
    
                return (
                    noteCategory.includes(currentsearch.substring(1))
                )
            }).sort((noteA, noteB) => Number(noteB.date) - Number(noteA.date)))
        } else {
            setDisplayNotes(notesInfo.filter(note => {
                const noteTitle = (note.heading).toLowerCase()
    
                return (
                    noteTitle.includes(currentsearch)
                )
            }).sort((noteA, noteB) => Number(noteB.date) - Number(noteA.date)))
        }

        console.log(notesInfo)
    }, [notesInfo])

    const [isMenuShowing, setIsMenuShowing] = useState(false)

    function toggleMenu(){
        setIsMenuShowing(prev => !prev)
    }
    
    /* Note filtering algorithm */

    function findNote(event){
        const {value} = event.target
        const searchValue = value.toLowerCase()

        if (searchValue.substring(0, 1) === ":"){
            setDisplayNotes(notesInfo.filter(note => {
                const noteCategory = note.category ? (note.category).toLowerCase() : "none"

                setCurrentSearch(searchValue)
    
                return (
                    noteCategory.includes(searchValue.substring(1))
                )
            }).sort((noteA, noteB) => Number(noteB.date) - Number(noteA.date)))
        } else {
            setDisplayNotes(notesInfo.filter(note => {
                const noteTitle = (note.heading).toLowerCase()

                setCurrentSearch(searchValue)
    
                return (
                    noteTitle.includes(searchValue)
                )
            }).sort((noteA, noteB) => Number(noteB.date) - Number(noteA.date)))
        }
    }

    async function addNote() {
        const newNoteId = currentUser.uid + "-" + Date.now()
        
        const notesRef = doc(db, currentUser.uid, newNoteId)

        const notesInfoSnap = await getDoc(notesRef)
                
        const data = {
            id: newNoteId,
            heading: "",
            body: "",
            date: Date.now(),
            category: ""
         }
        if (notesInfoSnap.exists()){
            return
        } else {
            await setDoc(notesRef, data) 
            navigate("/notes")
            receiveUpdates()
            setCurrentNote(data)
        }
    }

    function logOut(){
        setCurrentUser("")
    }
    /* Tab Components to be displayed from display notes */

    const arrayElements = displayNotes.map((note, index) => {
        return (
            <Tab
                key = {index}
                note = {note}
                setNotesInfo = {setNotesInfo}
                notesInfo={notesInfo}
                noteTabSection = {noteTabSection}
            />
        )
    })

    return (
        <main className={`tab-page ${noteTabSection && 'note-tab-section'} ${theme === 'dark' && 'dark'}`}>
            <button className='menu-bar-button'><img src={isMenuShowing ? closeIcon : menuBar} onClick={toggleMenu}/></button>
            <ToggleTheme />
            <aside className={`menu-bar ${theme === 'dark' && 'dark'}`} style={{display: isMenuShowing ? 'block' : 'none'}}>
                <div className='user-photo'>
                    <img src={userPhotoURL} />
                </div>
                <h3 className='username'>{currentUser.displayName}</h3>
                <button className='accounts-button log-out' onClick={logOut}><img src={logOut} />Log Out</button>
            </aside>
            <div className={`logo-container ${noteTabSection && 'note-tab-section'}`}><img src={logo} alt="Notes App" /></div>
            <input 
                className={`search-notes-field ${noteTabSection && 'note-tab-section'}`} 
                type='search' 
                placeholder='Search for Notes...' 
                onChange={findNote} 
            />
            <button className='add-note-button' onClick={addNote}><img src={addSign} /> Add Note</button>
            <section className={`tabs-section ${noteTabSection && 'note-tab-section'}`}>
                {arrayElements}
            </section>
        </main>
    )
}

export default TabSection