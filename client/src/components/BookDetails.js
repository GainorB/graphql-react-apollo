import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries';

class BookDetails extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  renderDetails = book => (
    <div>
      <h2>{book.name}</h2>
      <p>{book.genre}</p>
      <p>{book.author.name}</p>
      <ul className="other-books">{book.author.books.map(item => <li key={item.id}>{item.name}</li>)}</ul>
    </div>
  );

  render() {
    const { data: { book } } = this.props;
    return <div id="book-details">{book ? this.renderDetails(book) : 'Please select a book'}</div>;
  }
}

export default graphql(getBookQuery, {
  options: props => ({ variables: { id: props.bookid } }),
})(BookDetails);
