import React from 'react';
import PropTypes from 'prop-types';

// CSS
import '../static/css/style.css';

// COMPONENTS
import BookList from './components/BookList';
import AddBook from './components/AddBook';

const App = () => (
  <div>
    <h1>Gainor's Reading List</h1>
    <BookList />
    <AddBook />
  </div>
);

// App.PropTypes {}

export default App;
