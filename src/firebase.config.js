import firebase from 'firebase/app'
import "firebase/database"


const firebaseConfig = {
  apiKey: "AIzaSyD6NxycnoKMx6J3GY25hTqW6H-N3luh1gU",
  authDomain: "realm-db-dcd39.firebaseapp.com",
  databaseURL: "https://realm-db-dcd39-default-rtdb.asia-southeast1.firebasedatabase.app",
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig)
var FireDb = firebase.database();

export default FireDb