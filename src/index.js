import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Sfo from './Sfo';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware, combineReducers} from '@reduxjs/toolkit';
import {reducerForm, reducerValues, reducerSagaStatus} from './reducers/reducers';
import rootSaga from './saga/root';

const comboReducers = combineReducers({
  form: reducerForm,
  values: reducerValues,
  sagaStatus: reducerSagaStatus
})

const sagaMiddleware = createSagaMiddleware();

const store = createStore(comboReducers, applyMiddleware(sagaMiddleware));

ReactDOM.render(
    <Provider store={store}>
      <Sfo />
    </Provider>,
  document.getElementById('root')
);

sagaMiddleware.run(rootSaga);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();