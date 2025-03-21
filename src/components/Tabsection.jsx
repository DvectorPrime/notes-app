import { useEffect, useState } from 'react';

import { collection, getDocs } from 'firebase/firestore';

import { db } from '../firebase/firebaseConfig';

import Tab from './singleComponents/tab';
import './tabs.css';

import addSign from '../assets/add-sign.svg'
import menuBar from '../assets/menu-bar.svg'
import logOut from '../assets/logout.svg'
import deleteIcon from '../assets/delete.svg'

import { useAppData } from '../context/CurrentUserContext';
import { useNavigate } from 'react-router-dom';


function TabSection({noteTabSection}) {
    const {currentUser, setNotes} = useAppData();
    const [notesInfo, setNotesInfo] = useState([]) //to hold original notes info

    const userPhotoURL = currentUser.photoURL

    async function getNotes() {
        const noteSnapShots = await getDocs(collection(db, currentUser.uid));
        if (notesInfo.length === 0){
            noteSnapShots.forEach((doc) => {
                setNotesInfo(prev => [...prev, doc.data()]);
            });
        }
    }

    const navigate = useNavigate()
    
    useEffect(() => {
        if (!currentUser.uid){
            navigate("/login")
        } else {
            getNotes()
        }
    }, [currentUser.uid])

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
            }))
        } else {
            setDisplayNotes(notesInfo.filter(note => {
                const noteTitle = (note.heading).toLowerCase()
    
                return (
                    noteTitle.includes(currentsearch)
                )
            }))
        }

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
            }))
        } else {
            setDisplayNotes(notesInfo.filter(note => {
                const noteTitle = (note.heading).toLowerCase()

                setCurrentSearch(searchValue)
    
                return (
                    noteTitle.includes(searchValue)
                )
            }))
        }
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
        <main className={`tab-page ${noteTabSection && 'note-tab-section'}`}>
            <button className='menu-bar-button'><img src={menuBar} onClick={toggleMenu}/></button>
            <aside className='menu-bar' style={{display: isMenuShowing ? 'block' : 'none'}}>
                <div className='user-photo'>
                    <img src={userPhotoURL} />
                </div>
                <h3 className='username'>{currentUser.displayName}</h3>
                <button className='accounts-button log-out'><img src={logOut} />Log Out</button>
                <button className='accounts-button delete-account'><img src={deleteIcon} />Delete Account</button>
            </aside>
            <h1 className={`heading ${noteTabSection && 'note-tab-section'}`}>NOTES</h1>
            <input className={`search-notes-field ${noteTabSection && 'note-tab-section'}`} type='search' placeholder='Search for Notes...' onChange={findNote} />
            <button className='add-note-button'><img src={addSign} /> Add Note</button>
            <section className={`tabs-section ${noteTabSection && 'note-tab-section'}`}>
                {arrayElements}
            </section>
        </main>
    )
}

export default TabSection