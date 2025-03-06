import { useEffect, useState } from 'react';

import { collection, getDocs } from 'firebase/firestore';

import { db } from '../firebase/firebaseConfig';

import Tab from './singleComponents/tab';
import './tabs.css';

import { useAppData } from '../context/CurrentUserContext';
import { useNavigate } from 'react-router-dom';


function TabSection() {
    const {currentUser} = useAppData();
    const [notesInfo, setNotesInfo] = useState([]) //to hold original notes info

    async function getNotes() {
        const noteSnapShops = await getDocs(collection(db, currentUser.uid));
        if (notesInfo.length === 0){
            noteSnapShops.forEach((doc) => {
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
            />
        )
    })

    return (
        <main className='tab-page'>
            <h1 className='heading'>NOTES</h1>
            <input className='search-notes-field' type='search' placeholder='Search for Notes...' onChange={findNote} />
            <section className='tabs-section'>
                {arrayElements}
            </section>
        </main>
    )
}

export default TabSection