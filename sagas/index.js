import {
   call,
   put,
   select,
   takeEvery,
   takeLatest } from 'redux-saga/effects'
import {delay} from "redux-saga"
import * as Actions from '../actions'
// API calling functions
const fetchJSON = async (url,config = {}) => {
  let finalConfig = {
    ...config,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  let response = await fetch(url,finalConfig)
  return await response.json()
}
const getAudioStatus  = async (id) => {
  const url = `http://localhost:3005/audio/${id}`
  const audioStatus = await fetchJSON(url)
  return audioStatus
}
function* resetError() {
  yield put({
    type: Actions.SET_ERROR,
    error: null
  })
}
// TODO: allow search page changes here...
function* searchAudio(text) {
  // check if thats an act of clearing text or really searching
  const isAwaitingSearch = yield select(state => state.awaitingSearch)
  if(!isAwaitingSearch) {
    yield put({type: Actions.SET_SEARCH_RESULT, result: []})
    return
  } else {
    // now launch the search
    const url = `http://localhost:3005/search/${encodeURIComponent(text)}`
    try {
      const searchResult = yield call(fetchJSON,url)
      // and store the result the store
      yield put({
        type: Actions.SET_SEARCH_RESULT,
        result: searchResult
      })
      // we're no longer waiting for search
      console.log('search result done')
      yield put({
        type: Actions.SET_AWAIT_SEARCH,
        awaitSearch: false
      })
    } catch(e) {
      console.log("ERROR",e)
      yield put({
        type: Actions.SET_ERROR,
        error: e
      })
    }

  }

}
function* launchSearch(action) {
  console.log('launch search')
  yield put({
    type: Actions.SET_AWAIT_SEARCH,
    awaitSearch: action.searchText.length > 0
  })
  yield delay(2000) // debounce for 2 seconds
  yield call(searchAudio,action.searchText)
}
// watchers
/* watch searchText
  Flow:
    0.- Text changes
    1.- If text.length > 0:
      - mark await search
      - wait for 2 seconds
        - if text changes meanwhile, reset counter and go back to 0
        - otherwise:
          - mark await search false
          - launch search
          - get result
          - set result
    2.- If text.length == 0:
      - wait for 2 seconds
        -  if text changes meanwhile, reset counter and go back to 0
        - otherwise:
          - empty search result
*/
function* setSearchTextWatcher() {
  // 0.
  yield takeLatest(Actions.SET_SEARCH_TEXT,launchSearch)
}



export default function* rootSaga() {
  console.log('root saga')
  yield [
    setSearchTextWatcher()
  ]

}
