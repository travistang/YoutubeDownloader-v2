// for debugging purpose
// websocket should be used instead of simple GET requests
export const GET_AUDIO_INFO = "GET_AUDIO_INFO"
export const GET_AUDIO_INFO_RESULT = "GET_AUDIO_INFO_RESULT"
export const GET_AUDIO_INFO_ERROR  = "GET_AUDIO_INFO_ERROR"

// search functionality
export const SET_SEARCH_TEXT = "SET_SEARCH_TEXT" // setting search text doesn't mean the search has started...
export const SET_AWAIT_SEARCH= "SET_AWAIT_SEARCH"
export const START_SEARCH    = "START_SEARCH"   // this launches a search after the debounce interval has passed
export const END_SEARCH      = "END_SEARCH"

// search result
export const SET_SEARCH_RESULT  = "SET_SEARCH_RESULT"

// error
export const SET_ERROR = "SET_ERROR"

// show details of audio from search result
export const SHOW_AUDIO_DETAILS = "SHOW_AUDIO_DETAILS"

// launch download instructions
export const DOWNLOAD_AUDIO = "DOWNLOAD_AUDIO"

// socket-related actions
// export const SAVE_STORE = "SAVE_STORE"
export const SAVE_SOCKET = "SAVE_SOCKET"
export const LOAD_DOWNLOADED_AUDIO_INFO = "LOAD_DOWNLOADED_AUDIO_INFO"
export const UPDATE_AUDIO_INFO = "UPDATE_AUDIO_INFO"

// toasting option
export const SHOW_TOAST = "SHOW_TOAST_MESSAGE"
export const CLEAR_TOAST = "CLEAR_TOAST"
export const SHOW_LOADING_OVERLAY = "SHOW_LOADING_OVERLAY"
export const CLEAR_LOADING_OVERLAY = "CLEAR_LOADING_OVERLAY"

export const MARK_DOWNLOAD_INSTRUCTION_SENT = "MARK_DOWNLOAD_INSTRUCTION_SENT"
export const CLEAR_DOWNLOAD_INSTRUCTION_SENT = "CLEAR_DOWNLOAD_INSTRUCTION_SENT"

// server URL
// given a url, set its value to the store
export const SET_SERVER_URL = "SET_SERVER_URL"
// given a url, save it to ASYNC STORAGE
export const SAVE_SERVER_URL = "SAVE_SERVER_URL"
// mark the action of loading server url as complete
export const SET_LOAD_SERVER_URL_COMPLETE = "SET_LOAD_SERVER_URL_COMPLETE"
// report the error of the given URL
export const SET_SERVER_URL_UPDATE_ERROR = "SET_SERVER_URL_UPDATE_ERROR"
