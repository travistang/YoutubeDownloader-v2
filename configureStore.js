import { createStore,applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

// const persistConfig = {
//   key: 'root',
//   storage,
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(rootReducer,applyMiddleware(sagaMiddleware))
  // let persistor = persistStore(store)
  sagaMiddleware.run(rootSaga)
  return store
}
