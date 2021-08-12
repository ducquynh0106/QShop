import {createStore, applyMiddleware} from 'redux'
import RootReducer from './reducer'
import creactSagaMiddleware from 'redux-saga'
import rootSaga from './saga/rootSaga'

const sagaMiddleware=creactSagaMiddleware()
const store=createStore(RootReducer,applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)
export default store;