import React from 'react';
// import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

// COMPONENTS
import Home from './components/Home';

const App = () => (
  <div>
    <h1>Hello Gainor!</h1>
    <Route path="/" exact component={Home} />
  </div>
);

// App.PropTypes {}

export default App;
