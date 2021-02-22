import './index.css';
import './app.scss';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import AppRegistration from './components/registrationForm/AppRegistration.jsx';
import store from './reducers/index.js';

render(
  <Provider store={store}>
    <AppRegistration />
  </Provider>,
  document.getElementById('container'),
);
