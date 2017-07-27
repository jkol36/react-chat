import React, {Component} from 'react'
import {
  ListView,
  Text,
  View,
  TouchableHighlight
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { userRef } from '../config'

import CircleImage from '../components/circleImage'

export default class UserList extends Component {

  state = {
    dataSource: new ListView.DataSource({rowHasChanged: (oldRow, newRow) => oldRow !== newRow })
  }

  componentDidMount() {
    userRef.once('value', s => {
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      let users = Object.keys(s.val()).map(k => s.val()[k]).filter(user => user.uid !== this.props.navigation.state.params.userData.uid)
      if(s.exists) {
        this.setState({
          dataSource: ds.cloneWithRows(users),
          users
        })
      }
    })
  }

  selectUser(user) {
    const resetAction = NavigationActions.reset({
      index:0,
      actions: [
        NavigationActions.navigate({routeName:'Messenger', params: {userData: this.props.navigation.state.params.userData, userTwo: user }})
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  renderRow = (rowData) => {
    console.log('render row called with', rowData)
    const {id, first_name, work, uid} = rowData
    const bio = (work && work[0] && work[0].position) ? work[0].position.name : null
    return (
      <TouchableHighlight onPress={() => this.selectUser(uid) }>
        <View style={{flexDirection:'row', backgroundColor:'white', padding:10}} >
          <CircleImage size={80} facebookID={id} />
          <View style={{justifyContent:'center', marginLeft:10}} >
            <Text style={{fontSize:18}} >{first_name}</Text>
            <Text style={{fontSize:15, color:'darkgrey'}} >{bio}</Text>
          </View>
        </View>
        </TouchableHighlight>
    )
  }

  renderSeparator = (sectionID, rowID) => {
    return (
      <View key={rowID} style={{height:1, backgroundColor:'whitesmoke', marginLeft:100}} />
    )
  }

  render() {
    return (
      <ListView
        style={{flex:1, backgroundColor:'white'}}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
      />
    )
  }
}