import React, { useContext, useState, useEffect } from 'react'
import { auth } from  '../firebase';
const AuthContext = React.createContext();
export function useAuth() {
    return useContext(AuthContext)
}

function AuthProvider({children}) {
    
    const [currentUser, setCurrentUser] = useState({})
    
    // This function is going to return a promise which we're gonna return 
    // when we can actually use this inside of our SignUp component, to make sure 
    // that this actaully works successfully so we can give an error message when there's a 
    // failure or redirect the user to the correct page. 
    function signup(email, password) {
        // This createUser... function is coming from firebase, and firebase has its own way to 
        // notify us whenever the user gets set
        
        return auth.createUserWithEmailAndPassword(email, password)
    }

    

    useEffect(() => {
        // so whenever we call the createUserWithEmailAndPassword, it's gonna call setCurrentUser inside 
        // onAuthStateChanged, and set the currentUser to user object.
        // The return value gives us unsubscribe method, so that we can unsubscribe from it, 
        // when our job is done.   
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })    

        // so it is going to unsubscribe from the above listener auth.onAuthStateChange, when the component
        // is unMounted
        return unsubscribe
        }, [] );


        function login(email, password) {
            return auth.signInWithEmailAndPassword(email, password);
        }

        function logout() {
            return auth.signOut();
        }

        function resetPassword(email) {
            return auth.sendPasswordResetEmail(email)
        }

        function updateEmail(email) {
            return auth.currentUser.updateEmail(email);
        }

        function updatePassword(password) {
            return auth.currentUser.updatePassword(password);
        }

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        
    }


    return (
        <AuthContext.Provider value = {value}>
             {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider