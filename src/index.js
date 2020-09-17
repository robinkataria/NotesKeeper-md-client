import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {BrowserRouter,Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './redux/store'
import history from './history'
import ErrorBoundary from './ErrorBoundary'
import axios from 'axios'


axios.defaults.baseURL = 'https://noteskeeper-md.herokuapp.com'
//axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Router history={history}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Router>
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);



