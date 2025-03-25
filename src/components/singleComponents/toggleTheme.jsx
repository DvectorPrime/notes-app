import { useAppData } from "../../context/CurrentUserContext"

function ToggleTheme(){

    const {theme, setTheme} = useAppData()

    function toggleTheme(){
        setTheme(prev => prev === "light" ? "dark" : "light")
    }

    const toggleThumbStyle = {
        marginLeft: theme === "light" ? "0px" : window.innerWidth > 600 ? "29px" : "12px",
        backgroundColor: theme === "light" ? "white" : "blue"
    }

    const toggleBarStyle = {
        border: theme === "light" ? "3px solid white" : "3px solid rgb(0, 0, 100)"
    }


    return (
        <div className="theme">
            <p className="light">Light</p>
            <button className="toggle-bar" style={toggleBarStyle} onClick={toggleTheme}>
                <div className="toggle-thumb" id="toggle-thumb" style={toggleThumbStyle}></div>
            </button>
            <p className="dark">Dark</p>
        </div>
    )
}

export default ToggleTheme