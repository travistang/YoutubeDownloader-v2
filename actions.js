// for debugging purpose
// websocket should be used instead of simple GET requests
export const GET_AUDIO_INFO = 'GET_AUDIO_INFO'
export const GET_AUDIO_INFO_RESULT = 'GET_AUDIO_INFO_RESULT'
export const GET_AUDIO_INFO_ERROR  = 'GET_AUDIO_INFO_ERROR'

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