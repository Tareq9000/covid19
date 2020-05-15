import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './components/App.jsx'

const store = createStore(combineReducers({}), applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
);

