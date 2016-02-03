import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import WeatherReport from './src/WeatherReport';
import WheaterReducer from './src/WeatherReducer';
import FetchMiddleware from './src/FetchMiddleware';
import SequenceMiddleware from 'redux-sequence-action';
import ThunkMiddleware from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(FetchMiddleware, SequenceMiddleware,
  ThunkMiddleware)(createStore);
const reducer = combineReducers({ report: WheaterReducer });
const store = createStoreWithMiddleware(reducer);

ReactDOM.render(
  <Provider store={store}>
    <WeatherReport/>
  </Provider>,
  document.getElementById('main')
);
