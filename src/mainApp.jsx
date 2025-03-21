import TabSection from './components/Tabsection'
import NoteSection from './components/NoteSection'

function MainApp(){

    return (
        <div className='main-app'>
            {/* <title>Notes</title>
            {/* <TabSection /> 
            <div className='placeholder-tab-section'>

            </div> */}
            <NoteSection />
        </div>
      )
}

export default MainApp