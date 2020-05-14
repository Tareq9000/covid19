import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(combineReducers({}), applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <div>
      hello
    </div>
  </Provider>,
  document.getElementById('root')
);

