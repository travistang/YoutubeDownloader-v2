import React from 'react'
import {
  ScrollView
} from 'react-native'
import SearchResultList from '../containers/SearchResultList'
export default class MainAudioLists extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <ScrollView>
        {
          (this.props.searchResult.length)?<SearchResultList />:null
        }
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
