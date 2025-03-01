import { useState } from 'react';
import Tab from './singleComponents/tab';
import './tabs.css';

function TabSection() {
    const sampleArray = []

    
    let x = 0;
    while (x < 23){
        sampleArray.push(
            {
                heading: "The direct comiseration of the Great Lake of China. On the a kd voi t ttish thsis k seoskwo to ths sitlhs is tg",
                body: "This is a very long piece of Infomrration",
                category: null
            }
        )
        
        x++
        console.log(x)
    }
    const [notesInfo, SetNotesInfo] = useState(sampleArray)
    
    const arrayElements = notesInfo.map((note, index) => {
        return (
            <Tab
                key = {index}
                note = {note}
            />
        )
    })

    return (
        <main className='tab-page'>
            <h1 className='heading'>NOTES</h1>
            <input className='search-notes-field' type='text' placeholder='Search for Notes...' />
            <section className='tabs-section'>
                {arrayElements}
            </section>
        </main>
    )
}

export default TabSection