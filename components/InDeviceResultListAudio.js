import React from 'react'
import {
  Card,
  Text,
  View,
  ProgressBar,
  Colors,
  Button,
} from 'react-native-ui-lib'
import {
  StyleSheet,
  Image
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class InDeviceResultListAudio extends React.Component {
  // display a 3-step diagram
  // YT -> Server -> Device
  // status are displayed by color of the icons...
  // orange means proceeding; green means done; red means error. gray means not happened yet
  getAudioProgressComponent(audio) {
    const iconColors = [null,null,null,null,null], // 3 steps with 2 arrows, so 5 colors...
          doneColor = Colors.green40,
          progressColor = Colors.orange40,
          failedColor = Colors.red40,
          pendingColor = Colors.dark40
    // determine the colors of the icons first
    // these are from yt -> server
    if (audio.status === 'complete') {
      iconColors[0] = iconColors[1] = iconColors[2] = doneColor
      iconColors[3] = iconColors[4] = pendingColor
    }
    else if (audio.status === 'failed') {
      iconColors[0] = iconColors[1] = iconColors[2] = failedColor
      iconColors[3] = iconColors[4] = pendingColor
    }
    else if (audio.status === 'progress') {
      iconColors[0] = iconColors[1] = iconColors[2] = progressColor
      iconColors[3] = iconColors[4] = pendingColor
    }
    else if (audio.status === 'toDevice') {
      iconColors[0] = iconColors[1] = iconColors[2] = doneColor
      iconColors[3] = iconColors[4] = progressColor
    }
    else if (audio.status === 'onDevice') {
      iconColors[0] = iconColors[1] = iconColors[2] = doneColor
      iconColors[3] = iconColors[4] = doneColor
    } else {
      iconColors[0] = iconColors[1] = iconColors[2] = doneColor
      iconColors[3] = iconColors[4] = failedColor
    }

    const icons = "youtube,arrow-right,server,arrow-right,mobile"
      .split(',')
      .map((icon,i) => (<Icon color={iconColors[i]} name={icon} size={18} style={{margin: 4}}/>))
    const iconsContainer = (
      <View row style={style.progressIconView}>
        {icons}
      </View>
    )
    // prepare for the action slots (the things below the arrow stuffs)
    // if its downloading from server, then show the progress bar
    // if its completed, then show the download button
    // if its failed, show the retry button...

    let actionSlot = null
    if(audio.status === 'progress') {
      actionSlot = (
        <View style={style.progressView}>
          <Text> {audio.progress} %</Text>
          <ProgressBar
            style={{width: '100%'}}
            progress={audio.progress}
            height={10}
          />
        </View>
      )
    }
    else if (audio.status === 'complete') {
      actionSlot = (
        <View style={{width: '100%'}}>
          <Button block backgroundColor="transparent" onPress={this.props.downloadToDevice.bind(this,audio)}>
            <Icon name="download" />
          </Button>
        </View>
      )
    }
    else if (audio.status === 'toDevice') {
      actionSlot = (
        <View style={style.progressView}>
          <Text> {audio.toDeviceProgress} %</Text>
          <ProgressBar
            style={{width: '100%'}}
            progress={audio.toDeviceProgress}
            height={10}
          />
        </View>
      )
    }
    // both the arrow thing and the actions slots are prepared, now return both
    return (
      <View>
        {iconsContainer}
        {actionSlot}
      </View>
    )

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
            {this.getAudioProgressComponent.bind(this,audio)()}
          </Card.Section>
        </Card.Section>

      </Card>
    )
  }
  readyToPlayItemCompnent(audio,key) {
    
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
            <Text> Play Button </Text>
          </Card.Section>
        </Card.Section>

      </Card>
    )
  }
  render() {
    return (
      <View>
        <Text style={style.title}> Downloaded </Text>
        { this.props.audios.map(this.cardItemComponent.bind(this))  }
        <Text style={style.title}> Ready To Play </Text>
        { this.props.readyToPlay.map(this.readyToPlayItemCompnent.bind(this)) }
      </View>
    )
  }
}

const cardHeight = 148
const style = StyleSheet.create({
  progressIconView: {
    width: '100%',
  },
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
