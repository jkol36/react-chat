import React, { Component } from 'react'
import {StackNavigator, NavigationActions } from 'react-navigation'
import {Button} from 'react-native'
//import Profile from './screens/profile'
import Login from './screens/login'
import Messenger from './screens/messenger'
import UserList from './screens/userlist'
//import Explore from './screens/explore'
import * as C from './config'
import Expo from 'expo'


const goUserList = (userData, navigation) => {
          const resetAction = NavigationActions.reset({
              index: 0,
              actions: [
              NavigationActions.navigate({ routeName: 'UserList', params: {user1: userData} })
              ]
          })
          navigation.dispatch(resetAction)
          }
const logout =(navigation) => {
  const resetAction = NavigationActions.reset({
              index: 0,
              actions: [
              NavigationActions.navigate({ routeName: 'Login', params:{loggedOut: true}})
              ]
          })
          navigation.dispatch(resetAction)

}
const routeConfigs = {
    Login: {screen:Login},
    Messenger: {screen:Messenger, navigationOptions: ({navigation}) => ({
      headerRight: (
        <Button title='Go Back To User List' onPress={() => goUserList(navigation.state.params.user, navigation)}></Button>
      )
      })},
    UserList: {screen: UserList, navigationOptions: ({navigation}) => ({
      headerRight: (
        <Button title='Logout' onPress={() => logout(navigation)}/>
      )
    })}
    //Profile: {screen:Profile},
    //Explore: {screen:Explore},
}

const stackNavigatorConfig = {
    headerMode: 'float'
}

export default StackNavigator(routeConfigs, stackNavigatorConfig)
