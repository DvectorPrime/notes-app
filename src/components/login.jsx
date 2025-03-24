import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {app, db} from '../firebase/firebaseConfig'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDocs, collection } from "firebase/firestore"; 
import googleIcon from '../assets/google.png';

import { useAppData } from '../context/CurrentUserContext';
import "./login.css"

const Login = () => {
    
    const provider = new GoogleAuthProvider();
    
    const auth = getAuth(app);

    const {currentUser, setCurrentUser} = useAppData()

    const navigate = useNavigate()
    
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
            alert(`${errorCode}`)
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
        }
    }

    async function getUserInformation() {
        console.log(currentUser)

        //Holds info on whether the user has a collection
        const noteSnapShots = await getDocs(collection(db, currentUser.uid))

        //Holds info for creating new collection if the user has noon
        const notesRef = doc(db, currentUser.uid, "Welcome To Notes App")
        
        const data = {
            id: "Welcome To Notes App",
            heading: "A guide on how to use the notes app",
            body: "This is a very long piece of Information",
            date: Date.now(),
            category: "Welcome"
         }
        
        if (!noteSnapShots.length){
            console.log(noteSnapShots)
            navigate("/")
        } else {
            await setDoc(notesRef, data) 
            navigate("/")
        }
    }
    
    useEffect(() => {
        if (currentUser != ""){
            getUserInformation()
        }
    }, [currentUser])

    return (
        <div className='login-page'>
            <title>Login</title>
            <div className='login-page-banner'>
                <h1>NOTES APP</h1>
                <p>Sign in to access your notes anytime, anywhere on any device</p>
            </div>
            <div className='login-container'>
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