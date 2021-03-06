import './index.css';
import './app.scss';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppRegistration from './components/registrationForm/AppRegistration.jsx';
import App from './components/App.jsx';
import store from './reducers/index.js';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container'),
);
