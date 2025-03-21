import "./note.css"

import { useAppData } from "../context/CurrentUserContext"
import TabSection from "./Tabsection"

function NoteSection(){

    const {currentNote} = useAppData()

    return(
        <div className="note-page">
            <header className="header-component"></header>
            <main className="note-main">
                <section className="tab-section">
                    <TabSection noteTabSection={true}/>
                </section>
                <section className="note-section">
                    <label htmlFor="note-title" className="note-title-label hidden">Note Title</label>
                    <textarea type="text" name="note-title" id="note-title" className="note-title" placeholder="Enter Note Title" value={currentNote.heading ? currentNote.heading : ""} />
                    <label htmlFor="note-category" className="note-category-label hidden">Note Category</label>
                    <input type="text" name="note-category" id="note-category" className="note-category" maxLength={20} value={currentNote.category ? currentNote.category : 'add category'} />
                    <button className="edit-save-button">Edit Notes</button>
                    <textarea className="note-body" value={currentNote.body ? currentNote.body : "Your new note is ready"} />
                </section>
            </main>
        </div>
    )
}

export default NoteSection