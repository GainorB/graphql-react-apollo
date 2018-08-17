import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, getBooksQuery, addBookMutation } from '../queries';

class AddBook extends Component {
  static propTypes = {
    getAuthorsQueryDATA: PropTypes.object.isRequired,
    addBookMutation: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: '',
    };

    this.handleChange.bind(this);
    this.handleSubmit.bind(this);
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, genre, authorId } = this.state;
    this.props.addBookMutation({ variables: { name, genre, authorId }, refetchQueries: [{ query: getBooksQuery }] });
  };

  renderAuthors = () => {
    const { getAuthorsQueryDATA } = this.props;
    if (getAuthorsQueryDATA.loading) {
      return <option>Loading Authors</option>;
    }

    return getAuthorsQueryDATA.authors.map(author => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  };

  render() {
    const { name, genre, authorId } = this.state;
    return (
      <form id="add-book" onSubmit={this.handleSubmit}>
        <div className="field">
          <label>Book name:</label>
          <input type="text" name="name" value={name} onChange={this.handleChange} />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" name="genre" value={genre} onChange={this.handleChange} />
        </div>
        <div className="field">
          <label>Author:</label>
          <select name="authorId" value={authorId} onChange={this.handleChange}>
            <option>Select author</option>
            {this.renderAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQueryDATA' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
