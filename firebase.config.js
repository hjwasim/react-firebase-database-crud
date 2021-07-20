import firebase from 'firebase/app'
import "firebase/database"


const firebaseConfig = {
  //......
  // your config goes here....
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig)
var FireDb = firebase.database();

export default FireDb
