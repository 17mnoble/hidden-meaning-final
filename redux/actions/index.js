//used to save the user and save any uploaded text or image files
import {USER_STATE_CHANGE, USER_ENTRY_CHANGE} from '../constants/index'
import firebase from 'firebase'

//This is exported in order for the front end to be able to trigger it to effect the database
export function fetchUser(){
    //calls firestore to get a dispatch for currentUser and if the snapshot exists with currentUser data being received a dispatch is
    //sent to the reducer in order to update the current user state.
    return((dispatch) => {
        firebase.firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
            if(snapshot.exists){
                dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()})
              //  console.log(snapshot.data())
            }
            else{
                console.log('User Snapshot Does Not Exist')
            }
        })
    })
}

//This is exported in order for the front end to be able to trigger it to effect the database
export function fetchEntry(){
    //calls firestore to get a dispatch for currentUser and if the snapshot exists with currentUser data being received a dispatch is
    //sent to the reducer in order to update the current user state.
    return((dispatch) => {
        firebase.firestore()
        .collection("entries")
        .doc(firebase.auth().currentUser.uid)
        .collection("uniqueEntries")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => {
            let entry = snapshot.docs.map(doc =>  {
                const data = doc.data();
                const id = doc.id;
                return{id, ...data}
            })
            console.log(entry)
            dispatch({ type: USER_ENTRY_CHANGE, entry})
        })
    })
}
