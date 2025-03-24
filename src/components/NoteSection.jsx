import "./note.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import {db} from '../firebase/firebaseConfig'
import { doc, setDoc, deleteDoc } from "firebase/firestore"; 

import { useAppData } from "../context/CurrentUserContext"
import TabSection from "./Tabsection"

import arrowBackIcon from "../assets/arrow_back.svg"

function NoteSection(){

    const {currentUser, currentNote, receiveUpdates} = useAppData()

    const [allowEditing, setAllowEditing] = useState(false)

    const [currentNoteData, setCurrentNoteData] = useState({
        heading: currentNote.heading,
        body: currentNote.body,
        category: currentNote.category,
        date: currentNote.date,
        id: currentNote.id,
    })

    const navigate = useNavigate()

    useEffect(() => {
        setCurrentNoteData({
            heading: currentNote.heading,
            body: currentNote.body,
            category: currentNote.category,
            date: currentNote.date,
            id: currentNote.id,
        })

        console.log(currentNote)
    }, [currentNote])

    function handleChange(event){
        const {name, value} = event.target

        setCurrentNoteData(prev => {
            return {
                ...prev,
                [name] : value,
                date: Date.now()
            }
        })
    }

    function toogleEditing(){
        if (allowEditing){
            updateNotesDatabase()
            receiveUpdates()
        }

        setAllowEditing(prev => !prev)
    }

    async function updateNotesDatabase() {
        try {
            const notesRef = doc(db, currentUser.uid, currentNoteData.id)
            
            await setDoc(notesRef, currentNoteData)
        } catch (error) {
            alert(error)
        }
    }
    
    function goToTabs(){
        navigate('/')
    }

    async function deleteNote(){
        await deleteDoc(doc(db, currentUser.uid, currentNote.id))

        receiveUpdates();

        goToTabs(); 
    }


    return(
        <div className="note-page">
            <header className="header-component">
                 <button className='arrow-back-button'><img src={arrowBackIcon} onClick={goToTabs}/></button>
            </header>
            <main className="note-main">
                <section className="tab-section">
                    <TabSection noteTabSection={true} allowEditing={true} />
                </section>
                <section className="note-section">
                    <label htmlFor="note-title" className="note-title-label hidden">Note Title</label>
                    <textarea name="heading" id="note-title" className={`note-title ${allowEditing && 'editable'}`} placeholder="Enter Note Title" value={currentNoteData.heading} disabled={!allowEditing} onChange={handleChange} />
                    <label htmlFor="note-category" className="note-category-label hidden">Note Category</label>
                    <input type="text" name="category" id="note-category" className={`note-category ${allowEditing && 'editable'}`} maxLength={20} value={currentNoteData.category} disabled={!allowEditing} onChange={handleChange} placeholder="ADD CATEGORY"/>
                    <button className="edit-save-button" onClick={toogleEditing}>{!allowEditing ? 'Edit Note' : 'Save Note'}</button>
                    <button className="delete-note-button" onClick={deleteNote}>Delete Note</button>
                    <textarea name="body" id="note-body" className={`note-body ${allowEditing && 'editable'}`} value={currentNoteData.body} disabled={!allowEditing} onChange={handleChange} placeholder="Your new note is ready"/>
                </section>
            </main>
        </div>
    )
}

export default NoteSection