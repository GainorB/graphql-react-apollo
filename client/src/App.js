import React from 'react';

// CSS
import '../static/css/style.css';

// COMPONENTS
import BookList from './components/BookList';
import AddBook from './components/AddBook';

const App = () => (
  <div id="main">
    <h1>Gainor's Reading List</h1>
    <BookList />
    <AddBook />
  </div>
);

// App.PropTypes {}

export default App;
