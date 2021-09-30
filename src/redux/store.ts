// import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducer/root.reducer';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
// import rootSaga from '../modules/middleware';
import { rootsaga } from '../modules/saga';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';


// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }

const sagaMiddleware = createSagaMiddleware();



// const composeEnhancers : any = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
  // composeEnhancers(applyMiddleware(sagaMiddleware)),
  // enhancers: [composeEnhancers]
});
sagaMiddleware.run(rootsaga);

export default store;
