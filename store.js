import { createStore, applyMiddleware } from 'redux'
// import rootSaga from './sagas'
import rootReducer from './reducers'

export default configureStore = () => {
  // const sagaMiddleware = createSagaMiddleware()
  const store = createStore(rootReducer)
  // const store = createStore(rootReducer,applyMiddleware(sagaMiddleware))
  // sagaMiddleware.run(rootSaga)
  return store
}
