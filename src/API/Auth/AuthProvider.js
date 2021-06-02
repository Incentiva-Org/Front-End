import { auth } from "./Firebase"



export function createUser(email, password, username) {
    return auth.createUserWithEmailAndPassword(email, password).then(
        (result) => {
            auth.currentUser.sendEmailVerification()
            return result.user.updateProfile({
                displayName: username
            })
        })
}

export function loginUser(email, password) {

    return auth.signInWithEmailAndPassword(email, password)

}

export function logoutUser() {
    localStorage.removeItem('userData')
    return auth.signOut()
}


export function reloadUser() {
    if(auth.currentUser){
        auth.currentUser.reload()
    }
}
export function resendVerification() {
    auth.currentUser.sendEmailVerification()
}