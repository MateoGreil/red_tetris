import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import io from 'socket.io-client'
import redTetrisReducers from './reducers/redTetrisReducers';
import redTetrisMiddleware from './middlewares/socketMiddleware';
import addSocketListener from './socketListener'

const store = createStore(redTetrisReducers, applyMiddleware(redTetrisMiddleware))

addSocketListener(store.dispatch, store.getState)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
