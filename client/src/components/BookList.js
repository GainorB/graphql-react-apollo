import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries';
import BookDetails from './BookDetails';

class BookList extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { selected: null };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = book => this.setState({ selected: book });

  renderBooks = () =>
    this.props.data.books.map(book => (
      <li key={book.id} onClick={() => this.handleClick(book.id)}>
        {book.name}
      </li>
    ));

  render() {
    const { selected } = this.state;
    const { loading } = this.props.data;
    return (
      <div>
        <ul id="book-list">{!loading ? this.renderBooks() : 'Loading Books...'}</ul>
        <BookDetails bookid={selected} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
