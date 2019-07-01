import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Root from './components/Root';
import store from './store';

/* eslint-disable import/first */
import './assets/styles/index.scss';
/* eslint-enable */

const run = async () => {
  ReactDOM.render(
    <Router>
      <Root store={store} />
    </Router>,
    document.getElementById('root'),
  );
};

window.addEventListener('DOMContentLoaded', run);
