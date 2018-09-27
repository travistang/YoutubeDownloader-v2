import React from 'react'
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking
} from 'react-native'
import {
  Dialog,
  Text,
  View,
  Button,
  Colors
} from 'react-native-ui-lib'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class AudioDetailsDialog extends React.Component {
  openOnYoutube() {
    Linking.openURL(this.props.audioDetails.url)
  }
  //
  componentWillReceiveProps(props) {
    if(props.isDownloadInstructionSent) {
      this.props.dismissAudioDialog()
      this.props.resetDownloadInstructionSentFlag()
    }
  }
  download() {
    // TODO: start the download!
    this.props.download(this.props.audioDetails.id)
  }
  render() {
    const item = this.props.audioDetails
    if(!item) return null
    return (
      <Dialog
        visible={!!this.props.audioDetails}
        center
        height="50%"
      >
        <View style={style.container} bg-white padding-18>
          {/* Top remove bar*/}
          <View style={style.top} right>
            <TouchableOpacity onPress={this.props.dismissAudioDialog}>
              <Icon name="remove" size={22} />
            </TouchableOpacity>
          </View>
          {/* Bottom thumbnail + details + options*/}
          <View style={style.bottom}>
            {/* Thumbnail */}
            <View flex-1>
              <Image style={style.thumbnail} source={{uri: item.thumbnail}} />
            </View>
            {/* Details + options */}
            <View flex-2>
              {/* Details */}
              <Text style={style.title} dark40 bold>{item.name}</Text>
              <Text dark60 >ID: {item.id} </Text>
              <Text dark60 >Duration: {item.duration} </Text>
              {/* Options */}
              <View style={style.optionWrapper}>
                <TouchableOpacity style={style.option} onPress={this.openOnYoutube.bind(this)}>
                  <Icon name="youtube-play" size={24} color="red"/>
                </TouchableOpacity>
                <TouchableOpacity style={style.option} onPress={this.download.bind(this)}>
                  <Icon name="download" size={24} color={Colors.dark40}/>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
      </Dialog>
    )
  }
}

style = StyleSheet.create({
  container: {
    borderRadius: 16,
    height: '75%'
  },
  top: {
    flex: 1,
  },
  bottom: {
    flexDirection: 'row',
    flex: 3,
    padding: 8
  },
  title: {
    borderColor: Colors.dark70,
    borderBottomWidth: 4,
    fontSize: 16
  },
  thumbnail: {
    height: '100%',
    width: '100%'
  },
  optionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
  },
  option: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
