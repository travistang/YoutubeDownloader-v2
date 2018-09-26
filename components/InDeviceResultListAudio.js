import React from 'react'
import {
  Card,
  Text,
  View,
  ProgressBar,
  Colors
} from 'react-native-ui-lib'
import {
  StyleSheet,
  Image
} from 'react-native'

export default class InDeviceResultListAudio extends React.Component {
  getAudioProgressComponent(audio) {
    if(audio.progress === 100 || audio.status === 'complete') {
      return (<Text green10> On Server </Text>)
    }

    if(audio.progress) {
      return (
        <View style={style.progressView}>
          <Text> {audio.progress} %</Text>
          <ProgressBar

            progress={audio.progress}
            height={10}
          />
        </View>
      )
    }
    return (<Text> {audio.status} </Text>)
    // now its being downloaded, show progress
    // TODO: Download / play button!

    // its being downloaded but not yet completed

  }
  cardItemComponent(audio,key) {
    return (
      <Card key={key} row style={style.cardContainer}>
        <Image style={style.thumbnail} source={{uri: audio.thumbnail}} />
        <Card.Section body>
          <Card.Section>
            <Text text90 dark10 numberOfLines={2}>{audio.name}</Text>
          </Card.Section>
          <Card.Section>
            <Text> {audio.duration} </Text>
          </Card.Section>
          <Card.Section>
            {this.getAudioProgressComponent(audio)}
          </Card.Section>
        </Card.Section>

      </Card>
    )
  }

  render() {
    return (
      <View>
        <Text style={style.title}> Downloaded </Text>
        {this.props.audios.map(this.cardItemComponent.bind(this))}
      </View>
    )
  }
}

const cardHeight = 128
const style = StyleSheet.create({
  thumbnail: {
    height: cardHeight,
    width: '30%',
  },
  cardContainer: {
    height: cardHeight,
    margin: 8
  },
  title: {
    fontSize: 28,
    marginBottom: 16,
    marginTop: 16
  },
  progressView: {
    width: '100%',
  }
})
