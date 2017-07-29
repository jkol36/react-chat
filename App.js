import React, { Component } from 'react'
import {StackNavigator, NavigationActions } from 'react-navigation'
import {Button, View} from 'react-native'
//import Profile from './screens/profile'
import Login from './screens/login'
import Messenger from './screens/messenger'
import UserList from './screens/userlist'
import AudioRecorder from './screens/audioRecorder'
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
const goAudio = (userData, navigation) => {
          const resetAction = NavigationActions.reset({
              index: 0,
              actions: [
              NavigationActions.navigate({ routeName: 'AudioRecorder', params: {user1: userData} })
              ]
          })
          navigation.dispatch(resetAction)
          }
const goMessages = (userData, navigation) => {
    console.log('go messages called', userData)
          const resetAction = NavigationActions.reset({
              index: 0,
              actions: [
              NavigationActions.navigate({ routeName: 'Messenger', params: {user1: userData, threadId: navigation.state.params.threadId} })
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
    AudioRecorder: {screen:AudioRecorder, navigationOptions: ({navigation}) => ({
      headerTitle: 'Audio Recording',
      headerLeft: (
        <View style={{marginTop:10}}>
          <Button title='Go Back To User List' onPress={() => goUserList(navigation.state.params.user1, navigation)}></Button>
        </View>
      ), 
    })},
    Messenger: {screen:Messenger, navigationOptions: ({navigation}) => ({
      headerLeft: (
        <View style={{marginTop:10}}>
          <Button title='Go Back To User List' onPress={() => goUserList(navigation.state.params.user, navigation)}></Button>
        </View>
      ),
      headerRight: (
        <View> 
          <Button title='Record Audio' onPress={() => goAudio(navigation.state.params.user, navigation)}/>
        </View>
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
