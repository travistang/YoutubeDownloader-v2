import {
   call,
   put,
   all,
   select,
   takeEvery,
   takeLatest } from 'redux-saga/effects'
import {delay} from "redux-saga"
import {AsyncStorage} from 'react-native'
import {
  AUDIO_LIST_KEY
} from '../config'
import * as Actions from '../actions'
import io from 'socket.io-client';
import {DEFAULT_SERVER_URL,SERVER_URL_KEY} from '../config'
import {store} from '../App'
import {
  showOverlay,
  clearOverlay,
  showToast,
  clearToast
} from './overlay'
// storage functions

// honestly the audio value is NOT THAT IMPORTANT
// because its the key (audio id) that matters
// as the status will be updated by the websocket
const saveAudioId = async (audioId, audio) => {
  return cacheOrFetch(audioId,() => JSON.stringify(audio))
  // const keys = await AsyncStorage.getAllKeys()
  // if(keys.indexOf(audioId) > -1) return
  //
  // // no such audio, saving
  // return await AsyncStorage.setItem(audioId,JSON.stringify(audio))
}

// get all the audio ids that the user has tried to download
const getAllAudioIds = async () => {
  return await AsyncStorage
    .getAllKeys()
    .filter(key => key[0] !== '@') // those are internal configs...
}

const getAllRemoteAudioIds = (SERVER_URL) => async () => {
  const url = `${SERVER_URL}/audio`
  const audios = await fetchJSON(url)
  return audios
}

const getAllAudioSavedStatus = async () => {
  let allIds = await getAllAudioIds()
  return await AsyncStorage.multiGet(allIds)
}
// showing toast in a callback, where "yield" is not available...
const showToastInCallback = (message,delay) => {
  store.dispatch({
    type: Actions.SHOW_TOAST,
    message,
  })
  setTimeout(() => {
    store.dispatch({
      type: Actions.CLEAR_TOAST
    })
  },delay)
}
// given a socket, return a function that takes id as a function....
const subscribeToAudioStatusChange = (socket) => (id) => {
  socket.on(id, async (status) => {
    store.dispatch({
      type: Actions.UPDATE_AUDIO_INFO,
      id,
      status
    })
    // also update the asyncStorage to cache this audio's status
    await saveAudioId(id,status)
    if(status.progress && status.progress == 100) {
      // download completed!
      showToastInCallback(`Finished downloading ${status.name}`,3000)
    }
    else if(status.status == 'error') {
      store.dispatch({
        type: Actions.SHOW_TOAST,
        message: ``
      })
      showToastInCallback(`Error downloading ${status.name}`,3000)
    }
  })

}

// the saga that watches the "LOAD_DOWNLOADED_AUDIO_INFO" action

function* watchLoadDownloadedAudio () {

  yield takeLatest(Actions.LOAD_DOWNLOADED_AUDIO_INFO,function* () {
    yield call(showToast,`Fetching downloaded audios`)
    const serverURL = yield select(store => store.serverURL)
    if(!serverURL) return // cant go further...
    // first get all the marked entries from async storage
    // then for each of them, listen to the event
    const socket = yield select(store => store.socket)

    try {
      const audios = yield call(getAllRemoteAudioIds(serverURL))
      // first get the store to record all downloaded audios, aka those you pressed the "download" button
      yield all(
        audios.map(audio => put({
          type: Actions.UPDATE_AUDIO_INFO,
          id: audio.id,
          status: audio
        })
      ))
      // then for each unfinished download video: subscribe for changes
      audios
        .filter(a => a.status === 'pending'
          || (a.status === 'progress' && a.progress < 100))
        .forEach(a => subscribeToAudioStatusChange(socket)(a.id))
      // subscribe to each id
      yield call(clearToast)
    } catch(e) {
      // no internet connection?
      alert(JSON.stringify(e))
      const ids = yield call(getAllAudioIds)
      ids.forEach(subscribeToAudioStatusChange(socket))

    }

  })
}

// the saga that watches the audio download ("DOWNLOAD_AUDIO") instructions
function* watchDownloadAudioInstruction () {
  yield takeEvery(Actions.DOWNLOAD_AUDIO, function* (action) {
    const serverURL = yield select(store => store.serverURL)
    yield call(downloadAudioToServer(serverURL),action.id)
  })
}
// given a video id, download it from youtube to server
const  downloadAudioToServer = (SERVER_URL) => function*(id) {
  // trigger overlay...
  yield call(showOverlay,"Sending instructions...")
  const url = `${SERVER_URL}/audio/${id}`
  let response = yield call(fetchJSON,url,{
    method: 'post'
  })
  yield call(saveAudioId,id,response)
  const socket = yield select(store => store.socket)
  subscribeToAudioStatusChange(socket)(id)

  // then trigger the close of popup
  yield call(clearOverlay)
  yield call(showToast, "Download task queued.",3000)
  // notify the UI so that it knows the download instruction is sent
  // and the overlay can dismiss the layout...
  yield put({
    type: Actions.MARK_DOWNLOAD_INSTRUCTION_SENT
  })
}
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

// const getAudioStatus  = (SERVER_URL) => async (id) => {
//   const url = `${SERVER_URL}/audio/${id}`
//   const audioStatus = await fetchJSON(url)
//   return audioStatus
// }

function* resetError() {
  yield put({
    type: Actions.SET_ERROR,
    error: null
  })
}
// TODO: allow search page changes here...
const searchAudio = (SERVER_URL) => function* (text) {
  // now launch the search
  const url = `${SERVER_URL}/search/${encodeURIComponent(text)}`
  try {
    const searchResult = yield call(fetchJSON,url)
    // and store the result the store
    yield put({
      type: Actions.SET_SEARCH_RESULT,
      result: searchResult
    })
    // we're no longer waiting for search
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
// given the text input (new one), we can either :
/*
  See that its a clear operation ("cancel" button pressed),
  In this case simply set the searchText (which is ''),
  and do nothing else,
*/
function* launchSearch(action) {
  const serverURL = yield select(store => store.serverURL)
  yield put({
    type: Actions.SET_AWAIT_SEARCH,
    awaitSearch: action.searchText.length > 0
  })
  if(action.searchText.length > 0) {
      yield delay(2000) // debounce for 2 seconds
      yield call(searchAudio(serverURL),action.searchText) // then start the real search
  } else {
    yield put({
      type: Actions.SET_SEARCH_RESULT,
      result: []
    })
  }
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

function* loadAudioInfo() {
  yield put({
    type: Actions.LOAD_DOWNLOADED_AUDIO_INFO
  })
}
// helper function for "find cache first then fetch from remote" action
const cacheOrFetch = async (cacheKey,fetchFunc,cacheResult = true) => {
  let cache = await AsyncStorage.getItem(cacheKey)
  if(!!cache) return cache
  let response = await fetchFunc()
  // convert type to string for async storage
  if(typeof response !== 'string') response = JSON.stringify(response)
  if(cacheResult) await AsyncStorage.setItem(cacheKey,response)
  return response
}

// helper function for "fetch the response and save it to cache" action
const fetchAndCache = async (cachekey,fetchFunc) => {
  let response = await fetchFunc()
  if(typeof response !== 'string') response = JSON.stringify(response)
  await AsyncStorage.setItem(cacheKey,response)
  return response
}

// retrieve the saved server url from the store
function* getServerURL() {
  const serverURL = yield call(async () => await AsyncStorage.getItem(SERVER_URL_KEY))

  if(serverURL != null) {
    yield put({
      type: Actions.SET_SERVER_URL,
      url: serverURL
    })
  }
    // no matter there are values or what, mark it as completed ( becahse there are default ones...)
    yield put({type: Actions.SET_LOAD_SERVER_URL_COMPLETE})
}

// watch for "SAVE_SERVER_URL" event
function* watchSaveServerURL() {
  yield takeLatest(Actions.SAVE_SERVER_URL,function* (action) {
    // first check the url
    const validate = (url) => {
      if(!url) return "URL cannot be empty"
      if(url.trim().length === 0) "URL cannot be empty"
      if(!['http://','https://'].some(prefix => url.indexOf(prefix) === 0)) {
        return "Prefix of URL has to be 'http://' or 'https://'"
      }
      return null
    }
    const errorMessage = validate(action.url)
    if(errorMessage) {
      yield put({
        type: Actions.SET_SERVER_URL_UPDATE_ERROR,
        error: errorMessage
      })
      return // no more processing
    }
    // url is good, now...
    // remove the "load server complete" protection so that sockets will subscribe to new address
    yield put({
      type: Actions.SET_LOAD_SERVER_URL_COMPLETE,
      complete: false
    })
    const newURL = action.url
    // update the AsyncStorage's value
    yield call(async () => AsyncStorage.setItem(SERVER_URL_KEY,newURL))
    // update the store right now

    yield put({
      type: Actions.SET_SERVER_URL,
      url: newURL
    })

    // mark load server url complete again
    yield put({
      type: Actions.SET_LOAD_SERVER_URL_COMPLETE
    })
  })
}
export default function* rootSaga() {
  yield [
    getServerURL(),
    setSearchTextWatcher(),
    // this is for loading the status of all downloading audios on START UP
    watchLoadDownloadedAudio(),
    // this is for listening to the command for DOWNLOADING audios
    watchDownloadAudioInstruction(),
    // loadAudioInfo(),
    watchSaveServerURL(),
  ]

}
