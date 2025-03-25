import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {app, db} from '../firebase/firebaseConfig'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDocs, collection } from "firebase/firestore"; 
import googleIcon from '../assets/google.png';

import { useAppData } from '../context/CurrentUserContext';
import ToggleTheme from './singleComponents/toggleTheme';
import welcomeMessage from '../assets/welcome_data';
import "./login.css"

const Login = () => {
    
    const {currentUser, setCurrentUser, theme} = useAppData()
    
    const provider = new GoogleAuthProvider();
    
    const auth = getAuth(app);

    const navigate = useNavigate()

    //Authenticates User
    async function handleLogin() {
        try {
            const result = await signInWithPopup(auth, provider);

            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            const user = result.user;
            console.log(user)
            setCurrentUser(user)    
            
        } catch (error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`${errorCode} : ${errorMessage}`)
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
        }
    }

    async function getUserInformation() {

        //Holds info on whether the user has a collection
        const noteSnapShots = await getDocs(collection(db, currentUser.uid))

        //Holds info for creating new collection if the user has none
        const notesRef = doc(db, currentUser.uid, "Welcome To Notes App")
        
        const data = {
            id: "Welcome To Notes App",
            heading: "A guide on how to use the notes app",
            body: welcomeMessage,
            date: Date.now(),
            category: "Welcome"
         }
        
        if (noteSnapShots.length){
            navigate("/")
        } else {
            await setDoc(notesRef, data) 
            navigate("/")
        }
    }
    
    //Call getUserInformation to Authenticate User if there is no user authenticated
    useEffect(() => {
        if (currentUser != ""){
            getUserInformation()
        }
    }, [currentUser])

    return (
        <div className={`login-page ${theme === 'dark' && 'dark'}`}>
            <title>Login</title>
            <ToggleTheme />
            <div className='login-page-banner'>
                <h1>NOTES APP</h1>
                <p>Sign in to access your notes anytime, anywhere on any device</p>
            </div>
            <div className={`login-container ${theme === 'dark' && 'dark'}`}>
                <h3>Login to Notes App</h3>
                <button className='login-button' onClick={handleLogin}>
                    <img src={googleIcon} />
                    <p>Continue with Google</p>
                </button>
            </div>
        </div>
    );
};

export default Login;