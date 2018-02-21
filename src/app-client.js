import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import { render } from 'react-dom';

const AppClient = () => {
  <Router>
    <App />
  </Router>
};

window.onload = () => {
  render(
    <AppClient />,
    document.getElementById('main')
  );
};