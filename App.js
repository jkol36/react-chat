import {StackNavigator} from 'react-navigation'
//import Profile from './screens/profile'
import Login from './screens/login'
import Messenger from './screens/messenger'
//import Explore from './screens/explore'
import * as firebase from 'firebase'
import Expo from 'expo'


const firebaseConfig = {
    apiKey: "AIzaSyC7iPMm0wPxS7v0F5msHC9ujK8yVGMDMw0",
    authDomain: "kala-a9ade.firebaseapp.com",
    databaseURL: "https://kala-a9ade.firebaseio.com",
    projectId: "kala-a9ade",
    storageBucket: "kala-a9ade.appspot.com",
    messagingSenderId: "660151192704",
}

firebase.initializeApp(firebaseConfig)

const routeConfigs = {
    Messenger: {screen:Messenger},
    Login: {screen:Login},
    //Profile: {screen:Profile},
    //Explore: {screen:Explore},
}

const stackNavigatorConfig = {
    headerMode: 'none',
}

export default StackNavigator(routeConfigs, stackNavigatorConfig)
