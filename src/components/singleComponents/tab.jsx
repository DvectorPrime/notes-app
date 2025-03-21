import { db } from "../../firebase/firebaseConfig"
import { doc, setDoc } from "firebase/firestore"

import { useAppData } from "../../context/CurrentUserContext"

import { useNavigate } from "react-router-dom"


function Tab({note, notesInfo, setNotesInfo, noteTabSection}){
    const navigate = useNavigate()
    const { currentUser, setCurrentNote } = useAppData()

    /*To manage date information */
    const rawDate = note.date
    const date = new Date(Number(rawDate)).toDateString()

    /* Hold specific note index */
    const index = notesInfo.indexOf(note)

    function openNote(){
        setCurrentNote(notesInfo[index])

        navigate("/notes")
    }

    /* Updates note category for local notes app */
    function updateCategory(event) {

        const {value} = event.target

        const holderNotesArray = notesInfo.map((note, i) => {
            if (index === i){
                return {...note, category : value, date : Date.now()}
            } else {
                return note
            }
        })

        setNotesInfo(holderNotesArray)
    }

    /*To change the category on firebase, This is done separate from local to reducing number of writes to the database */
    async function editCategory(event){

        const notesRef = doc(db, currentUser.uid, note.id)
        
        const data = {
            id: note.id,
            heading: note.heading,
            body: note.body,
            date: Date.now(),
            category: event.target.value
        }
        
        await setDoc(notesRef, data)

    }
    
    return (
        <button className={`note-tab ${noteTabSection && 'note-tab-section-heading'}`} onClick={openNote}>
            <input 
                type='text' 
                value={note.category !== null ? note.category : 'Add Category'} 
                className='tab-category'
                maxLength={20}
                disabled
            />
            <div className="note-last-edited-time">{date}</div>
            <h3>{note.heading}</h3>
        </button>
    )
}
export default Tab
