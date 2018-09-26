import {connect} from 'react-redux'
import SearchResultList from '../components/SearchResultList'
import * as Actions from '../actions'
const mapStateToProps = state => {
  return state
}
const mapDispatchToProps = dispatch => {
  return {
    showAudioDetails: (item) => dispatch({
      type: Actions.SHOW_AUDIO_DETAILS,
      audio: item
    }),

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SearchResultList)
