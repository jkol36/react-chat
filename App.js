import {StackNavigator} from 'react-navigation'
//import Profile from './screens/profile'
import Login from './screens/login'
import Messenger from './screens/messenger'
//import Explore from './screens/explore'
import * as C from './config'
import Expo from 'expo'


const routeConfigs = {
    Login: {screen:Login},
    Messenger: {screen:Messenger},
    //Profile: {screen:Profile},
    //Explore: {screen:Explore},
}

const stackNavigatorConfig = {
    headerMode: 'none',
}

export default StackNavigator(routeConfigs, stackNavigatorConfig)
