import React from 'react';
import PropTypes from 'prop-types';

// CSS
import '../static/css/style.css';

// COMPONENTS
import Home from './components/Home';
import BookList from './components/BookList';

const App = () => (
  <div>
    <h1>Gainor's Reading List</h1>
    <BookList />
  </div>
);

// App.PropTypes {}

export default App;
