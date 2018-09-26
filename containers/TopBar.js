import {connect} from 'react-redux'
import TopBar from '../components/TopBar'
import * as Actions from '../actions'
const mapStateToProps = state => {
  return state
}
const mapDispatchToProps = (dispatch) => {
  return {
    search: (text) => dispatch({
      type: Actions.SET_SEARCH_TEXT,
      searchText: text
    }),
    clearToast: () => dispatch({
      type: Actions.CLEAR_TOAST
    })
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(TopBar)
