import * as Actions from './actions'
import {DEFAULT_SERVER_URL} from './config'
const initialState = {
  searchResult: [],
  searchText: '',
  awaitingSearch: false,

  error: null,

  audioDetails: null,
  isDownloadInstructionSent: false,
  // the already downloaded videos,
  // this should share the same format as the search result
  inDeviceAudios: {},

  store: null,

  // toasting and overlay
  overlayMessage: null,
  toastMessage: null,

  serverURL: DEFAULT_SERVER_URL,
  isServerURLLoadingComplete: false,
  serverURLUpdateError: null,

  audioInstance: null ,// the react-native-sound object
  playingAudioInfo: null // the info of the audio in play
}
export default function (state = initialState,action) {
  console.log(action)
  switch (action.type) {

    case Actions.GET_AUDIO_INFO_RESULT:
      return {...state,audioResult: action.result}

    case Actions.SET_SEARCH_TEXT:
      return {...state,searchText: action.text}

    case Actions.SET_SEARCH_RESULT:
      return {...state,searchResult: action.result}
    case Actions.SET_AWAIT_SEARCH:
      return {...state,awaitingSearch: action.awaitSearch}

    case Actions.SET_ERROR:
      return {...state,error: action.error}

    case Actions.SHOW_AUDIO_DETAILS:
      return {...state,audioDetails: action.audio}

    case Actions.SAVE_SOCKET:
      return {...state,socket: action.socket}

    case Actions.SAVE_STORE:
      return {...state,store: action.store}

    case Actions.UPDATE_AUDIO_INFO:
      return {
        ...state,
        inDeviceAudios: {
          ...state.inDeviceAudios,
          [action.id]: {...state.inDeviceAudios[action.id],...action.status}
        }
      }
    case Actions.SHOW_LOADING_OVERLAY:
      return {
        ...state,
        overlayMessage: action.message
      }
    // a helper here...
    case Actions.CLEAR_LOADING_OVERLAY:
      return {
        ...state,
        overlayMessage: null
      }
    case Actions.SHOW_TOAST:
      return {
        ...state,
        toastMessage: action.message
      }
    // a helper here...
    case Actions.CLEAR_TOAST:
      return {
        ...state,
        toastMessage: null
      }

    case Actions.MARK_DOWNLOAD_INSTRUCTION_SENT:
      return {
        ...state,
        isDownloadInstructionSent: true
      }
    case Actions.CLEAR_DOWNLOAD_INSTRUCTION_SENT:
      return {
        ...state,
        isDownloadInstructionSent: false
      }
    case Actions.SET_SERVER_URL:
      return {
        ...state,
        serverURL: action.url,
        urlUpdateError: null // clear error on update
      }
    case Actions.SET_LOAD_SERVER_URL_COMPLETE:
      return {
        ...state,
        isServerURLLoadingComplete: action.complete || true
      }
    case Actions.SET_SERVER_URL_UPDATE_ERROR:
      return {
        ...state,
        urlUpdateError: action.error
      }
    case Actions.DOWNLOAD_AUDIO_TO_DEVICE_PROGRESS:
      return {
        ...state,
        inDeviceAudios: {
          ...state.inDeviceAudios,
          [action.id]: {
            ...state.inDeviceAudios[action.id],
            toDeviceProgress: action.progress,
            status: 'toDevice'
          }
        }
      }
    case Actions.SET_AUDIO_INSTANCE:
      return {
        ...state,
        audioInstance: action.audioInstance
      }
    case Actions.SET_PLAYING_AUDIO_INFO:
      return {
        ...state,
        playingAudioInfo: action.playingAudioInfo
      }
    case Actions.REGISTER_AUDIO_ON_DEVICE:
      return {
        ...state,
        inDeviceAudios: {
          ...state.inDeviceAudios,
          [action.audio.id]: {
            ...action.audio,
            path: action.path
          }
        }
      }
    default:
      return state

  }
}
