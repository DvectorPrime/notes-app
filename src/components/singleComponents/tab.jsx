function Tab({note}){
    return (
        <button className='note-tab line-clamp'>
            <input 
                type='text' 
                value={note.category ? note.category : 'Add Category'} 
                className='tab-category'
            />
            <h3>{note.heading}</h3>
        </button>
    )
}
export default Tab
