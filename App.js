/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import {
  View,
  Dialog,
  Button,
  Text,
  TextInput,
  Colors,
} from 'react-native-ui-lib'
import {Provider} from 'react-redux'
import configureStore from './configureStore'
import MainAudioLists from './containers/MainAudioLists'
import SearchResultList from './containers/SearchResultList'
import TopBar from './containers/TopBar'
import AudioDetailsDialog from './containers/AudioDetailsDialog'
import io from 'socket.io-client';
import {SERVER_URL} from './config'
import {
  SAVE_STORE,
  SAVE_SOCKET,
  LOAD_DOWNLOADED_AUDIO_INFO,

  SAVE_SERVER_URL,

  CLEAR_TOAST,
  CLEAR_LOADING_OVERLAY
} from './actions'
import Icon from 'react-native-vector-icons/FontAwesome'
import {DEFAULT_SERVER_URL} from './config'
import { connect } from 'react-redux'
export const store = configureStore()

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isServerURLDialogOpen: false,
      serverURLInputValue: DEFAULT_SERVER_URL,
      isServerURLLoaded: false, // stop recursive trigger of the load of url server
    }
  }
  componentWillReceiveProps(newProps) {
    // update the serverURLInputValue to the one in the store
    // start the socket once the server url is loaded
    if(newProps.isServerURLLoadingComplete && !this.state.isServerURLLoaded) {
      this.setState({
        isServerURLLoaded: true,
        isServerURLDialogOpen: false, // close when finished loading, for setting new url
        serverURLInputValue: newProps.serverURL || DEFAULT_SERVER_URL
      })

      // sorry, need to have some backend code here...
      const socket = io(newProps.serverURL)
      // mark down store and socket here...
      store.dispatch({
        type:  SAVE_SOCKET,
        socket
      })

      socket.on('connect',() => {
        // trigger the audio info load: fetch the info of the audios the user tried to download
        // the sagas will do the work for us
        store.dispatch({
          type: LOAD_DOWNLOADED_AUDIO_INFO
        })
      })
    }
  }

  getMainContainerStyle() {
    return {
      ...styles.container,
      paddingTop:(Platform.OS === 'ios')?20:0
    }
  }
  getServerConfigHelpText() {
    return `
      Enter the URL of the server the runs the corresponding backend for the app:
      https://github.com/travistang/YoutubeDownloader-Backend
    `
  }
  onServerConfigDialogCancel() {
    this.setState({
      isServerURLDialogOpen: false,
      serverURLInputValue: this.props.serverURL
    })
  }

  setServerUrl() {
    // trigger reload
    this.setState({isServerURLLoaded: false},() => {
      // try updating
      this.props.setServerUrl(this.state.serverURLInputValue)
    })
  }

  getServerConfigDialog() {
    return (
      <Dialog
        centeri
        height="50%"
        visible={this.state.isServerURLDialogOpen}
        onDismiss={this.onServerConfigDialogCancel.bind(this)}
      >
        <View style={style.serverConfigContainer} bg-white padding-18>
          {/* Top remove bar*/}
          <View style={style.serverConfigTop}>
            <Text text40 flex-1>Server URL</Text>
            <View flex-1>
              <TouchableOpacity onPress={() => this.setState({isServerURLDialogOpen: false})}>
                <Icon name="remove" size={22} />
              </TouchableOpacity>
            </View>

          </View>
          <View style={style.serverConfigBottom}>
            <TextInput
              floatingPlaceholderColor={Colors.dark40}
              floatingPlaceholder="Server URL"
              title="Server URL"
              titleColor={Colors.dark40}
              value={this.state.serverURLInputValue}
              onChangeText={(text) => this.setState({serverURLInputValue: text})}
              helperText={this.getServerConfigHelpText()}
            />
            <View row>
              <View flex-1 center>
                <Button backgroundColor="transparent"
                  onPress={this.onServerConfigDialogCancel.bind(this)}>
                  <Text dark40>Cancel</Text>
                </Button>
              </View>
              <View flex-1 center>
                <Button backgroundColor="transparent"
                  onPress={this.setServerUrl.bind(this)}>
                  <Text green40>Confirm</Text>
                </Button>
              </View>

            </View>
          </View>
        </View>
      </Dialog>
    )
  }
  /*
    If it is not searching:
    - Show audios available from server (small list)
    - Show audios already on devices (long list)

    Otherwise:
    - Show search results from server (small list)
    - Show audios already on devices MATCHING THE SEARCH STRING
  */

  render() {
    return (
        <View style={this.getMainContainerStyle()}>
          <TopBar onSettingsClick={() => this.setState({isServerURLDialogOpen: true})}/>
          <MainAudioLists />
          {/* For showing the details of audio*/}
          <AudioDetailsDialog />
          {/* For server url settings */}
          {this.getServerConfigDialog()}
        </View>
    );
  }
}

// sorry, even the "App" needs to connect to the store as well...
const mapStateToProps = (s) => s
const mapDispatchToProps = dispatch => ({
  setServerUrl: (url) => dispatch({type: SAVE_SERVER_URL,url})
})
const AppContainer = connect(mapStateToProps,mapDispatchToProps)(App)

const styles = StyleSheet.create({
  serverConfigContainer: {
    borderRadius: 16,
    height: '75%'
  },
  serverConfigTop: {
    flex: 1,
    padding: 8,
    flexDirection: 'row'
  },
  serverConfigBottom: {
    flexDirection: 'row',
    flex: 3,
    padding: 8

  },
  container: {
    paddingTop: 20,
    paddingLeft: 8,
    paddingRight: 8,
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
