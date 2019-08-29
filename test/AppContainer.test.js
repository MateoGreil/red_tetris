import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from '../src/client/containers/AppContainer';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'

import redTetrisReducers from '../src/client/reducers/redTetrisReducers';
import redTetrisMiddleware from '../src/client/middlewares/socketMiddleware';

const store = createStore(redTetrisReducers, applyMiddleware(redTetrisMiddleware))


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer />
    </Provider>,
    div);
  ReactDOM.unmountComponentAtNode(div);
});