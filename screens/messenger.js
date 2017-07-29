import React, { Component } from 'react';
import { TouchableHighlight, Image, View, Text, Platform, Dimensions, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { GiftedChat, Actions, Bubble } from 'react-native-gifted-chat';
import CustomActions from '../components/customActions'
import { messagesRef, threadRef } from '../config/index'
import Expo, { Asset, Audio, Font, Permissions } from 'expo';

class Icon {
  constructor(module, width, height) {
    this.module = module;
    this.width = width;
    this.height = height;
    Asset.fromModule(this.module).downloadAsync();
  }
}

const ICON_RECORD_BUTTON = new Icon(
  require('../assets/images/record_button.png'),
  70,
  119
);
const ICON_RECORDING = new Icon(
  require('../assets/images/record_icon.png'),
  20,
  14
);

const ICON_PLAY_BUTTON = new Icon(
  require('../assets/images/play_button.png'),
  34,
  51
);
const ICON_PAUSE_BUTTON = new Icon(
  require('../assets/images/pause_button.png'),
  34,
  51
);
const ICON_STOP_BUTTON = new Icon(
  require('../assets/images/stop_button.png'),
  22,
  22
);

const ICON_MUTED_BUTTON = new Icon(
  require('../assets/images/muted_button.png'),
  67,
  58
);
const ICON_UNMUTED_BUTTON = new Icon(
  require('../assets/images/unmuted_button.png'),
  67,
  58
);

const ICON_TRACK_1 = new Icon(require('../assets/images/track_1.png'), 166, 5);
const ICON_THUMB_1 = new Icon(require('../assets/images/thumb_1.png'), 18, 19);
const ICON_THUMB_2 = new Icon(require('../assets/images/thumb_2.png'), 15, 19);

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = 'black';
const LIVE_COLOR = '#FF0000';
const DISABLED_OPACITY = 0.5;
const RATE_SCALE = 3.0;



export default class Messenger extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
      user: this.props.navigation.state.params.user
    }
    this._isMounted = false;
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderChatFooter = this.renderChatFooter.bind(this)

    this._isAlright = null;
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
  }

  renderCustomActions(props) {
    if (Platform.OS === 'ios') {
      return (
        <CustomActions
          {...props}
        />
      );
    }
    const options = {
      'Action 1': (props) => {
        alert('option 1');
      },
      'Action 2': (props) => {
        alert('option 2');
      },
      'Cancel': () => {},
    };
    return (
      <Actions
        {...props}
        options={options}
      />
    );
  }
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    );
  }
  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  renderChatFooter(props) {
    return (
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}> 
          Testing 123
        </Text>
      </View>
    )
  }
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
          renderActions={this.renderCustomActions}
          renderBubble={this.renderBubble}
          renderCustomView={this.renderCustomView}
          renderFooter={this.renderFooter}
          //renderChatFooter={this.renderChatFooter}
        />
    );
  }

}

const styles = StyleSheet.create({
  emptyContainer: {
    alignSelf: 'stretch',
    backgroundColor: BACKGROUND_COLOR,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: BACKGROUND_COLOR,
    minHeight: DEVICE_HEIGHT,
    maxHeight: DEVICE_HEIGHT,
  },
  noPermissionsText: {
    textAlign: 'center',
  },
  wrapper: {},
  halfScreenContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: DEVICE_HEIGHT / 2.0,
    maxHeight: DEVICE_HEIGHT / 2.0,
  },
  recordingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: ICON_RECORD_BUTTON.height,
    maxHeight: ICON_RECORD_BUTTON.height,
  },
  recordingDataContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: ICON_RECORD_BUTTON.height,
    maxHeight: ICON_RECORD_BUTTON.height,
    minWidth: ICON_RECORD_BUTTON.width * 3.0,
    maxWidth: ICON_RECORD_BUTTON.width * 3.0,
  },
  recordingDataRowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: ICON_RECORDING.height,
    maxHeight: ICON_RECORDING.height,
  },
  playbackContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: ICON_THUMB_1.height * 2.0,
    maxHeight: ICON_THUMB_1.height * 2.0,
  },
  playbackSlider: {
    alignSelf: 'stretch',
  },
  liveText: {
    color: LIVE_COLOR,
  },
  recordingTimestamp: {
    paddingLeft: 20,
  },
  playbackTimestamp: {
    textAlign: 'right',
    alignSelf: 'stretch',
    paddingRight: 20,
  },
  image: {
    backgroundColor: BACKGROUND_COLOR,
  },
  textButton: {
    backgroundColor: BACKGROUND_COLOR,
    padding: 10,
  },
  buttonsContainerBase: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonsContainerTopRow: {
    maxHeight: ICON_MUTED_BUTTON.height,
    alignSelf: 'stretch',
    paddingRight: 20,
  },
  playStopContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: (ICON_PLAY_BUTTON.width + ICON_STOP_BUTTON.width) * 3.0 / 2.0,
    maxWidth: (ICON_PLAY_BUTTON.width + ICON_STOP_BUTTON.width) * 3.0 / 2.0,
  },
  volumeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: DEVICE_WIDTH / 2.0,
    maxWidth: DEVICE_WIDTH / 2.0,
  },
  volumeSlider: {
    width: DEVICE_WIDTH / 2.0 - ICON_MUTED_BUTTON.width,
  },
  buttonsContainerBottomRow: {
    maxHeight: ICON_THUMB_1.height,
    alignSelf: 'stretch',
    paddingRight: 20,
    paddingLeft: 20,
  },
  rateSlider: {
    width: DEVICE_WIDTH / 2.0,
  },
});