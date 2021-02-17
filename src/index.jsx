import './index.css';
import './app.scss';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppRegistration from './components/registrationForm/AppRegistration.jsx';
import reducers from './reducers/index.js';

const store = createStore(
  reducers,
);

render(
  <Provider store={store}>
    <AppRegistration />
  </Provider>,
  document.getElementById('container'),
);
