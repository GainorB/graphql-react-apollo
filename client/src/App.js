import React from 'react';
// import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import '../static/css/style.css';

// COMPONENTS
import Home from './components/Home';

const App = () => (
  <div>
    <h1>Gainor's Reading List</h1>
    <Route path="/" exact component={Home} />
  </div>
);

// App.PropTypes {}

export default App;
