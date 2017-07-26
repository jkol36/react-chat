import * as firebase from 'firebase'
console.log('config running')
global.Promise = require('bluebird')
const firebaseConfig = {
    apiKey: "AIzaSyC7iPMm0wPxS7v0F5msHC9ujK8yVGMDMw0",
    authDomain: "kala-a9ade.firebaseapp.com",
    databaseURL: "https://kala-a9ade.firebaseio.com",
    projectId: "kala-a9ade",
    storageBucket: "kala-a9ade.appspot.com",
    messagingSenderId: "660151192704",
}

firebase.initializeApp(firebaseConfig)
export const userRef = firebase.database().ref('users')
export const messagesRef = firebase.database().ref('messages')