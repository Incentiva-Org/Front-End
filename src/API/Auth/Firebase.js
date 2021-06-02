import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyBFKoBkWpfB-D1G6iEaRJBCkzrv59N0ZC0",
    authDomain: "incentiva-24e76.firebaseapp.com",
    projectId: "incentiva-24e76",
    storageBucket: "incentiva-24e76.appspot.com",
    messagingSenderId: "126535042315",
    appId: "1:126535042315:web:34ffc281c775da8b708e0e",
    measurementId: "G-KN35D0N40D"
})

export default app
export const auth = app.auth()
