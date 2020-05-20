import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import covidReducer from './reducers/covidReducer.js'

import Summary from './components/Summary.jsx'

const store = createStore(combineReducers({covidReducer: covidReducer}), applyMiddleware(thunk))

const rendering = () => {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <Summary />
      </div>
    </Provider>,
    document.getElementById('root')
  );
}

store.subscribe(rendering);
rendering();