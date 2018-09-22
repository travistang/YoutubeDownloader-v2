import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native'
import {
  Card
} from 'react-native-ui-lib'
import {NUM_RESULTS_PER_PAGE} from '../config'
export default class SearchResultItem extends React.Component {
  render() {
    return (
      <TouchableOpacity style={style.container} onPress={this.props.onPress}>
        <Image style={style.thumbnail} source={{uri: this.props.item.thumbnail}} />
        <Text numberOfLines={2}>
          {this.props.item.name}
        </Text>
      </TouchableOpacity>

    )
  }
}

const style = StyleSheet.create({
  thumbnail: {
    height: '70%',
    borderRadius: 16,
    width: '100%'
  },
  container: {
    height: 120,
    width: Dimensions.get('window').width / (NUM_RESULTS_PER_PAGE / 2) - 16, // including margin
    margin: 4,
  }
})
