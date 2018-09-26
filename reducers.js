import * as Actions from './actions'
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
          [action.id]: action.status
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
    default:
      return state

  }
}
