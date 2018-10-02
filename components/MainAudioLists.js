import React from 'react'
import {
  ScrollView
} from 'react-native'
import SearchResultList from '../containers/SearchResultList'
import InDeviceResultListAudio from './InDeviceResultListAudio'
export default class MainAudioLists extends React.Component {
  constructor(props) {
    super(props)
  }
  filteredInDeviceAudios() {
    if(!this.props.searchText || !this.props.searchText.length) {
      return Object.values(this.props.inDeviceAudios)
    }
    return
      Object.values(this.props.inDeviceAudios)
        .filter(audio =>
          audio.name.toLowerCase().trim()
            .indexOf(this.props.searchText
              .toLowerCase().trim()) > -1)
  }
  render() {
    return (
      <ScrollView>
        {
          (this.props.searchResult.length)?<SearchResultList />:null
        }

        <InDeviceResultListAudio
          downloadToDevice={this.props.downloadToDevice}
          audios={this.filteredInDeviceAudios()} />

      </ScrollView>
    )
  }
}

// <ScrollView>
//   {
//     (this.props.searchText && this.props.searchText.length > 0) && (<SearchResultList />)
//   }
//   {
//     /* The list of available audios on server comes later*/
//   }
//   {
//     /* The list of available audios on device comes later*/
//   }
//
// </ScrollView>
