import { useAppData } from "../../context/CurrentUserContext"

import { useNavigate } from "react-router-dom"


function Tab({note, notesInfo, setNotesInfo, noteTabSection}){
    const navigate = useNavigate()
    const { setCurrentNote } = useAppData()

    /*To manage date information */
    const rawDate = note.date
    const date = new Date(Number(rawDate)).toDateString()

    /* Hold specific note index */
    const index = notesInfo.indexOf(note)

    function openNote(){
        setCurrentNote(notesInfo[index])

        navigate("/notes")
    }
    
    return (
        <button className={`note-tab ${noteTabSection && 'note-tab-section-heading'}`} onClick={openNote}>
            <input 
                type='text' 
                value={note.category !== "" ? note.category : 'Add Category'} 
                className='tab-category'
                maxLength={20}
                disabled
            />
            <div className="note-last-edited-time">{date}</div>
            <h3>{note.heading ? note.heading : "No Heading"}</h3>
        </button>
    )
}
export default Tab
