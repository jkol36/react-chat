import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, Alert, Dimensions, ActivityIndicator } from 'react-native'
import { Constants, Facebook, Location, Permissions, Video } from 'expo'
import { NavigationActions } from 'react-navigation'
import { FontAwesome } from '@expo/vector-icons'
import * as firebase from 'firebase'


const {width,height} = Dimensions.get('window')

export default class LoginComponent extends Component {
  constructor(props) {
    super(props)
  }
  state = {
      showSpinner: true,
  }

  componentDidMount() {
    //firebase.auth().signOut()
    if(this.props.navigation.state.params) {
      if(this.props.navigation.state.params.loggedOut)
        return firebase.auth().signOut().then(() => {
          this.goLogin()
        })
    }
    firebase.auth().onAuthStateChanged(auth => {
      if (auth) {
        this.firebaseRef = firebase.database().ref('users')
        this.firebaseRef.child(auth.uid).on('value', snap =>{
          const userData = snap.val()
          console.log(userData)
          if (userData != null) {
            this.firebaseRef.child(auth.uid).off('value')
            this.goUserList(userData)
          }
        })
      }
      else {
        this.setState({showSpinner: false})
      }
    })
  }



  authenticate = (token) => {
      const provider = firebase.auth.FacebookAuthProvider
      const credential = provider.credential(token) //takes token as argument so is passed in authenticate function
      return firebase.auth().signInWithCredential(credential)
  }

  createUser = (uid, userData) => {
      firebase.database().ref('users').child(uid).update({...userData,uid})
  }

   goUserList(userData) {
          const resetAction = NavigationActions.reset({
              index: 0,
              actions: [
              NavigationActions.navigate({ routeName: 'UserList', params: {user1: userData} })
              ]
          })
          this.props.navigation.dispatch(resetAction)
          }
    goLogin() {
          const resetAction = NavigationActions.reset({
              index: 0,
              actions: [
              NavigationActions.navigate({ routeName: 'Login'})
              ]
          })
          this.props.navigation.dispatch(resetAction)
          }

  _handleFacebookLogin = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        '1915637992059020', // Replace with your own app id in standalone app
        { permissions: ['public_profile'] }
      )

      switch (type) {
        case 'success': {
          // Get the user's name using Facebook's Graph API
          const fields = [
                'id',
                'name', 
                'first_name',
                'last_name',
                'age_range',
                'gender',
                'locale',
                'verified',
                'updated_time'
                ]
          const response = await fetch(`https://graph.facebook.com/me?fields=${fields.toString()}&access_token=${token}`)
          const userData = await response.json()
          const {uid, email, displayName} = await this.authenticate(token)
          //console.log(uid, email, displayName)
          this.createUser(uid, userData)
          //console.log(userData)
          this.goUserList(userData)
          break
        }
        case 'cancel': {
          Alert.alert(
            'Cancelled!',
            'Login was cancelled!',
          )
          break
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          )
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Login failed!',
      )
    }
  }



  render() {
    return (

      <View style={styles.container}>
      {this.state.showSpinner ? <ActivityIndicator animating={this.state.showSpinner} /> :
      
      

      <View style={styles.container}>
          
          <Video
            source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
            rate={1.0}
            volume={0.0}
            muted={false}
            resizeMode="stretch"
            shouldPlay
            isLooping
            style={{ width: width, height: height }}
          />
        
        <View style={styles.overlay}>
          <FontAwesome name={'facebook-official'} size={35} color={'white'} />
          <Button
          title='Login with Facebook'
          onPress={this._handleFacebookLogin}
          color='white'
          />
        </View>

      </View>}
      </View>

    )
  }
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  //paddingTop: Constants.statusBarHeight,
  backgroundColor: '#ecf0f1',
},
overlay: {
  overflow: 'hidden',
  position: 'absolute',
  //bottom: 35,
  top: height/1.25,
  flexDirection:'row',
  backgroundColor: '#4267B2',
  borderRadius: 5,
  width: 220,
  height: 42,
  //border: 5,
  paddingHorizontal: 5,
  paddingTop: 3,


}
})