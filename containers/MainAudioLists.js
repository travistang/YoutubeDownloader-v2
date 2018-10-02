import {connect} from 'react-redux'
import MainAudioLists from '../components/MainAudioLists'
import * as Actions from '../actions'

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    downloadToDevice: (id) => dispatch({
      type: Actions.DOWNLOAD_AUDIO_TO_DEVICE,
      id
    })
  }
}
export default connect(mapStateToProps,null)(MainAudioLists)
