import {connect} from 'react-redux'
import AudioDetailsDialog from '../components/AudioDetailsDialog'
import * as Actions from '../actions'
const mapStateToProps = state => {
  return {
    audioDetails: state.audioDetails,
    isDownloadInstructionSent: state.isDownloadInstructionSent
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    dismissAudioDialog: () => dispatch({
      type: Actions.SHOW_AUDIO_DETAILS,
      audio: null
    }),
    download: (id) => dispatch({
      type: Actions.DOWNLOAD_AUDIO,
      id
    }),
    resetDownloadInstructionSentFlag: () => dispatch({
      type: Actions.CLEAR_DOWNLOAD_INSTRUCTION_SENT
    })
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AudioDetailsDialog)
