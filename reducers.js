import * as Actions from './actions'
const initialState = {
  searchResult: [],
  searchText: '',
  awaitingSearch: false,

  error: null,

  audioDetails: null,
  // the already downloaded videos,
  // this should share the same format as the search result
  inDeviceAudios: []
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
    
    default:
      return state

  }
}
