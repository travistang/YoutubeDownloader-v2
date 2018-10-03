import {connect} from 'react-redux'
import MainAudioLists from '../components/MainAudioLists'
import * as Actions from '../actions'

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    downloadToDevice: (audio) => dispatch({
      type: Actions.DOWNLOAD_AUDIO_TO_DEVICE,
      audio
    })
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(MainAudioLists)
