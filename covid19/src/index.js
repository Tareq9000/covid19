import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './components/App.jsx'
import covidReducer from './reducers/covidReducer.js'
const store = createStore(combineReducers({covidReducer: covidReducer}), applyMiddleware(thunk))

const rendering = () => {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <App />
      </div>
    </Provider>,
    document.getElementById('root')
  );
}

store.subscribe(rendering);
rendering();