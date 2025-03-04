function Tab({note, notesInfo, setNotesInfo, sampleArray}){
    const rawDate = note.date
    const date = new Date(Number(rawDate)).toDateString()
    const index = notesInfo.indexOf(note)

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

    function editCategory(event){

        sampleArray[index].category = event.target.value

    }

    console.log(index)
    
    return (
        <button className='note-tab'>
            <input 
                type='text' 
                value={note.category !== null ? note.category : 'Add Category'} 
                className='tab-category'
                onBlur={editCategory}
                onChange={updateCategory}
            />
            <div className="note-last-edited-time">{date}</div>
            <h3>{note.heading}</h3>
        </button>
    )
}
export default Tab
