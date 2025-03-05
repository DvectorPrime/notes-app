function Tab({note, notesInfo, setNotesInfo, sampleArray}){
    /*To manage date information */
    const rawDate = note.date
    const date = new Date(Number(rawDate)).toDateString()

    /* Hold specific note index */
    const index = notesInfo.indexOf(note)

    /* Updates note category for local notes app */
    function updateCategory(event) {

        const {value} = event.target

        const holderNotesArray = notesInfo.map((note, i) => {
            if (index === i){
                return {...note, category : value}
            } else {
                return note
            }
        })

        setNotesInfo(holderNotesArray)
    }

    /*To change the category on firebase, This is done separate from local to reducing number of writes to the database */
    function editCategory(event){

        sampleArray[index].category = event.target.value

    }
    
    return (
        <button className='note-tab'>
            <input 
                type='text' 
                value={note.category !== null ? note.category : 'Add Category'} 
                className='tab-category'
                onBlur={editCategory}
                onChange={updateCategory}
                maxLength={20}
            />
            <div className="note-last-edited-time">{date}</div>
            <h3>{note.heading}</h3>
        </button>
    )
}
export default Tab
