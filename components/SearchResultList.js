import React from 'react'
import {
  StyleSheet,
  Dimensions
} from 'react-native'
import {
  View,
  PageControl,
  Carousel,
  Colors,
} from 'react-native-ui-lib'
import SearchResultItem from './SearchResultItem'
import {
  NUM_RESULTS_PER_PAGE
} from '../config'
import * as Utils from '../utils'

export default class SearchResultList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 0
    }
  }
  getNumberOfPages() {
    // plus 1 is for the "next page" thing
    // the "or" is to prevent this thing from giving NaN
    return Math.ceil(this.props.searchResult.length / (NUM_RESULTS_PER_PAGE || 1)) + 1
  }
  getDisplayItems(i) {
    // evalute which items to display
    let numItemsPerPage = this.getNumberOfPages(),
        startIndex = i * numItemsPerPage,
        endIndex = startIndex + numItemsPerPage,
        displayItems = this.props.searchResult.slice(startIndex,endIndex + (i != 0)) // because the last index is exclusive..
    // and turn them to components...
    return displayItems.map((item,j) => (
      <SearchResultItem
        onPress={() => this.props.showAudioDetails(item)}
        key={j + startIndex}
        item={item}
      />
    ))
  }
  onChangePage(index,isDirect = false) {

    this.setState({
      ...this.state,
      currentPage: index
    })
    if(isDirect) {
      // triggered by page click
      // thanks https://github.com/wix/react-native-ui-lib/issues/185
      this.carousel.goToPage(index)
    }
  }
  render() {
    return (
      <View style={style.container}>
        {/* The container for putting the flex-wrap results*/}

        <Carousel
          ref={r => this.carousel = r}
          pageWidth={Dimensions.get('window').width - 16}
          onChangePage={this.onChangePage.bind(this)}
        >
          {
            Utils.listOfN(this.getNumberOfPages())
              .map(n => (
                <View style={style.resultContainer}>
                  {this.getDisplayItems(n)}
                </View>
              ))
          }
        </Carousel>

        {/* The "dots" below*/}
        <PageControl
          color={Colors.dark40}
          style={style.pageControl}
          numOfPages={this.getNumberOfPages()}
          currentPage={this.state.currentPage}
        />
      </View>

    )
  }
}

const style = StyleSheet.create({
  resultContainer: {
    width: Dimensions.get('window').width - 16,
    paddingLeft: 4,
    paddingRight: 4,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  pageControl: {
    height: 32
  }
})
