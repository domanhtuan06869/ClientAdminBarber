import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';
import thunk from "redux-thunk";
import reducer from '../src/combinereducers/combineReducers'
import registerServiceWorker,{unregister} from '../src/componentsAdmin/registerServiceWorker';
const store = createStore(reducer, applyMiddleware(thunk));
ReactDOM.render(  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
  registerServiceWorker()
  unregister()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

