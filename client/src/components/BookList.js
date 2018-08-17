import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries';

class BookList extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  renderBooks = () => this.props.data.books.map(book => <li key={book.id}>{book.name}</li>);

  render() {
    const { loading } = this.props.data;
    return (
      <div>
        <ul id="book-list">{!loading ? this.renderBooks() : 'Loading Books...'}</ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
