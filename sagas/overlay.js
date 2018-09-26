// sagas controlling the overlay appearing time / message etc.
import * as Actions from '../actions'
import {
  delay
} from 'redux-saga'
import {
  put,
} from 'redux-saga/effects'
export function* showOverlay(message,time) {
  yield put({
    type: Actions.SHOW_LOADING_OVERLAY,
    message,
  })
  if(time) {
    yield delay(time)
    yield put({
      type: Actions.CLEAR_LOADING_OVERLAY
    })
  }

}

export function* showToast(message,time) {
  yield put({
    type: Actions.SHOW_TOAST,
    message
  })
  if(time) {
    yield delay(time)
    yield put({
      type: Actions.CLEAR_TOAST
    })
  }
}

export function* clearOverlay() {
  yield put({
    type: Actions.CLEAR_LOADING_OVERLAY
  })
}

export function* clearToast() {
  yield put({
    type: Actions.CLEAR_TOAST
  })
}
