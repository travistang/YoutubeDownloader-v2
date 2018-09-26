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
  Text
} from 'react-native-ui-lib'
import SearchResultItem from './SearchResultItem'
import {
  NUM_RESULTS_PER_PAGE
} from '../config'
import * as Utils from '../utils'
import Spinner from 'react-native-spinkit'
import SpinnerOverlay from './SpinnerOverlay'
import Notice from './Notice'
export default class SearchResultList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 0
    }
  }

  getNumberOfPages() {
    // the "or" is to prevent this thing from giving NaN
    return Math.ceil(this.props.searchResult.length / (NUM_RESULTS_PER_PAGE || 1))
  }
  getDisplayItems(i) {
    // evalute which items to display
    let numItemsPerPage = this.getNumberOfPages(),
        startIndex = i * numItemsPerPage,
        endIndex = startIndex + numItemsPerPage,
        displayItems = this.props.searchResult.slice(startIndex,endIndex) // because the last index is exclusive..
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
    if(index > this.getNumberOfPages()) {
      // we're on the "load more" page...
      // TODO: dispatch "Load more " action
    }
    if(isDirect) {
      // triggered by page click
      // thanks https://github.com/wix/react-native-ui-lib/issues/185
      this.carousel.goToPage(index)
    }
  }
  getContainerStyle() {
    if(!this.props.awaitingSearch) return style.container
    else return {
      ...style.container,

    }
  }
  render() {
    const numPages = this.getNumberOfPages()
    return (
      <View style={this.getContainerStyle()}>
        {/* The container for putting the flex-wrap results*/}
        <Text style={style.title}> Search Result </Text>
        {
          !this.props.awaitingSearch?(
            [
              (<Carousel
                ref={r => this.carousel = r}
                pageWidth={componentWidth}
                onChangePage={this.onChangePage.bind(this)}
              >
                {
                  Utils.listOfN(numPages)
                    .map(n => (
                      <View style={style.resultContainer}>
                        {this.getDisplayItems(n)}
                      </View>
                    ))
                }
                {
                  // the next page thing
                  // TODO: how about the "No result"?
                  (numPages > 0)?(
                    <View style={style.loadingPageContainer}>
                      <Spinner
                        isVisible={true}
                        size={22}
                        type="Circle"
                        color={Colors.dark40}>
                      </Spinner>
                      <Text style={style.loadingPageText} dark40>Loading more results...</Text>
                    </View>
                  ): null
                }
              </Carousel>),
              (<PageControl
                color={Colors.dark40}
                style={style.pageControl}
                numOfPages={(numPages == 0)?0:(1 + numPages)}
                currentPage={this.state.currentPage}
              />)
            ]
          ):(
            <Notice
              style={style.searchNotice}
              icon="search"
              text="Searching..."
            />
          )

      }
      </View>

    )
  }
}

const componentWidth = Dimensions.get('window').width - 16
const componentHeight = 300
const style = StyleSheet.create({
  searchNotice: {
    height: componentHeight,
    color: Colors.dark10,

  },
  resultContainer: {
    width: componentWidth,
    height: componentHeight,
    paddingLeft: 4,
    paddingRight: 4,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  loadingPageContainer: {
    width: componentWidth,
    paddingLeft: 4,
    paddingRight: 4,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingPageText: {
    marginTop: 8
  },
  pageControl: {
    height: 32
  },
  title: {
    fontSize: 28,
    marginBottom: 16,
    marginTop: 16
  },
  loadingOverlay: {
    position: 'absolute',
    zIndex: 200,
    top: 0,
    left: 0,
    width: componentWidth,
    height: componentHeight,

  }
})
