import React from 'react'
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import {
  Colors,
  View,
  Text,
  Button,
  TextInput
} from  'react-native-ui-lib'

import Spinner from 'react-native-spinkit'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class TopBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isInputtingText: false
    }
  }

  getSettingsButton() {
    return (
      <TouchableOpacity>
        <Icon name="gear" size={24} color={Colors.dark10}/>
      </TouchableOpacity>
    )
  }
  onSearchTextChanged(text) {
    // render the cancel button if there are achanges
    let isInputtingText = (text && text.length > 0)
    this.setState({...this.state, isInputtingText})
    this.props.search(text)
  }
  renderSearchClearButton() {
    if(!this.state.isInputtingText) return null
    return (
      <TouchableOpacity style={style.clearSearchButton} onPress={this.clearSearch.bind(this)}>
        <Icon name="remove" size={16}/>
      </TouchableOpacity>
    )
  }
  clearSearch() {
    this.searchInput.clear()
    this.onSearchTextChanged('')
  }
  renderAwaitSearchButton() {
    if(this.props.awaitSearch) { // awaiting for search?

    }
  }
  render () {
    return (
      <View style={style.container}>
        <View style={style.top}>
          <View style={style.title}>
            <Text uppercase style={{color: 'red',fontWeight: 'bold'}}>Youtube</Text>
            <Text uppercase style={{color: Colors.dark10,fontWeight: 'bold'}}> Downloader</Text>
          </View>

          <View style={style.button}>
            {this.getSettingsButton()}
          </View>

        </View>
        <View style={style.bottom}>
          <Icon name="search" size={20} color={Colors.dark40}/>
          <View style={style.searchWrapper}>
            <TextInput
              ref={input => {this.searchInput = input}}
              onChangeText={this.onSearchTextChanged.bind(this)}
              style={style.searchComponent}
              placeholder="Search Audio..."
              floatOnFocus
              hideUnderline
            />
          </View>
          <Spinner
            isVisible={this.props.awaitingSearch}
            size={22}
            type='Circle'
            style={style.awaitSpinner}
            color={Colors.dark40}
          />
          {this.renderSearchClearButton()}
        </View>

      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    height: 128
  },
  awaitSpinner: {
    marginLeft: 16,
    marginRight: 8,
  },
  top: {
    flex: 1,
    // justifyContent: 'center',
    flexDirection: 'row',
    // backgroundColor: 'yellow'
  },
  title: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'green'
  },
  button: {
    justifyContent: 'center',
    width: 32
  },
  searchComponent: {
    // height: 22
    marginTop: 20,
    color: Colors.dark40,
    fontWeight: '400'
  },
  searchWrapper: {
    flex: 1,
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  clearSearchButton: {
    marginLeft: 16,
    marginRight: 16
  },
  bottom: {
    height: 48,
    margin: 16,
    shadowColor: 'black',
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 6,
    paddingLeft: 16,
    shadowOpacity: 0.2,
    shadowRadius: 5,

  }
})
