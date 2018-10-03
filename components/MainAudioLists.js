import React from 'react'
import {
  ScrollView
} from 'react-native'
import SearchResultList from '../containers/SearchResultList'
import InDeviceResultListAudio from './InDeviceResultListAudio'
import _ from 'lodash'

export default class MainAudioLists extends React.Component {
  constructor(props) {
    super(props)
  }
  separateAudios() {

    const matchSearch = audio => (!this.props.searchText ||
            audio.name.toLowerCase().trim().indexOf(
            this.props.searchText.toLowerCase().trim()) > -1)
    let onServerAudiosList = [],
        onDeviceAudiosList = []
        for(let i in this.props.inDeviceAudios) {
          const audio = this.props.inDeviceAudios[i]
          if(!matchSearch(audio)) continue
          if(audio.path) onDeviceAudiosList.push(audio)
          else onServerAudiosList.push(audio)
        }
    const result = {
      onServerAudiosList,
      onDeviceAudiosList
    }
    console.log('onDeviceAudiosList',onDeviceAudiosList)
    return result
  }

  render() {
    const {
      onServerAudiosList,
      onDeviceAudiosList
    } = this.separateAudios()
    return (
      <ScrollView>
        {
          (this.props.searchResult.length)?<SearchResultList />:null
        }

        <InDeviceResultListAudio
          downloadToDevice={this.props.downloadToDevice}
          readyToPlay={onDeviceAudiosList}
          audios={onServerAudiosList} />

      </ScrollView>
    )
  }
}
