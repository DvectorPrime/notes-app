import { useEffect, useState } from 'react';
import Tab from './singleComponents/tab';
import './tabs.css';

function TabSection() {
    /*Generates Test array pending when you set up firebase */
    const sampleArray = []

    
    let x = 0;
    while (x < 1){
        sampleArray.push(
            {
                heading: "The direct comiseration of the Great Lake of China.",
                body: "This is a very long piece of Information",
                date: "10534500000",
                category: null
            }
        )

        sampleArray.push(
            {
                heading: "The building of the notes app.",
                body: "This is a very long piece of Information",
                date: "1002342300000",
                category: null
            }
        )

        sampleArray.push(
            {
                heading: "Finding purpose in Computer Science.",
                body: "This is a very long piece of Information",
                date: "100035234530000",
                category: null
            }
        )

        sampleArray.push(
            {
                heading: "The colonization of Africa.",
                body: "This is a very long piece of Information",
                date: "1053450023000",
                category: null
            }
        )

        sampleArray.push(
            {
                heading: "The research on human evolution.",
                body: "This is a very long piece of Information",
                date: "100235930320000",
                category: null
            }
        )

        sampleArray.push(
            {
                heading: "My favourite poems.",
                body: "This is a very long piece of Information",
                date: "10003923345000",
                category: null
            }
        )
        
        x++
    }
    const [notesInfo, setNotesInfo] = useState(sampleArray) //to hold original notes info
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
                sampleArray = {sampleArray}
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