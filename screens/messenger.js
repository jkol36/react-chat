import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation'
import { GiftedChat } from 'react-native-gifted-chat';
import { messagesRef, threadRef } from '../config/index'

export default class Messenger extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
      user: this.props.navigation.state.params.user
    }
  }

  componentDidMount() {
    messagesRef
    .child(this.props.navigation.state.params.threadId)
    .once('value', s => {
      if(s.exists()) {
        this.setState({
          messages: Object.keys(s.val()).map(k => s.val()[k])
        })
      }
    })
    // this.setState({
      // messages: [
      //   {
      //     _id: 1,
      //     text: `Hello ${this.state.user.first_name}`,
      //     createdAt: new Date(),
      //     user: {
      //       _id: 2,
      //       name: 'React Native',
      //       avatar: 'https://facebook.github.io/react/img/logo_og.png',
      //     },
      //   },
      //   {
      //     _id: 2,
      //     text: 'How are you',
      //     createdAt: new Date(),
      //     user: {
      //       _id: 2,
      //       name: 'React Native',
      //       avatar: 'https://facebook.github.io/react/img/logo_og.png',
      //     },
      //   },
      // ],
    // });
  }
  

  onSend(messages = []) {
    Promise.all(Promise.map(messages, (message) => {
      let newMessageRef = messagesRef.child(this.props.navigation.state.params.threadId).push()
      return newMessageRef.set(Object.assign({}, message, {createdAt: new Date(), }))
    })) 
    .then(() => {
        this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }))
    })

  }

  render() {
    return (
      <GiftedChat
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={this.state.user}
        />
    );
  }

}