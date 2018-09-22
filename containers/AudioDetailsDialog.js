import {connect} from 'react-redux'
import AudioDetailsDialog from '../components/AudioDetailsDialog'
import * as Actions from '../actions'
const mapStateToProps = state => {
  return {
    audioDetails: state.audioDetails
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    dismissAudioDialog: () => dispatch({
      type: Actions.SHOW_AUDIO_DETAILS,
      audio: null
    })
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AudioDetailsDialog)
