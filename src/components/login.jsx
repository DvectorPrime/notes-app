import {useContext} from 'react';
import googleIcon from '../assets/google.png';
import "./login.css"
import { UserContext } from '../context/CurrentUserContext.jsx';

import {app} from '../firebase/firebaseConfig'

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

const auth = getAuth(app);

const { currentUser } = useContext(UserContext)

async function handleLogin() {
    try {
        const result = await signInWithPopup(auth, provider);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user)

        console.log(currentUser)
        // IdP data available using getAdditionalUserInfo(result)
    } catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
    }
}

const Login = () => {
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