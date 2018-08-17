const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/Book');
const Author = require('../models/Author');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLInt, GraphQLList } = graphql;

// describes the BookType
const BookType = new GraphQLObjectType({
  name: 'Book',
  // fields are our properties
  // will help overcome reference errors when we have multiple types
  fields: () => ({
    id: { type: GraphQLID }, // GraphQLID allows you to query by ID as an integer or string => but args.id is still a string type
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    // nesting
    author: {
      type: AuthorType,
      // parent object contains the data that was passed through from the parent query (Book)
      resolve(parent, args) {
        const { authorId } = parent;
        // return _.find(authors, { id: authorID });
        return Author.findById(authorId);
      },
    },
  }),
});

// describes the AuthorType
const AuthorType = new GraphQLObjectType({
  name: 'Author', // mandatory
  // wrap field in function so the SchemaTypes don't get undefined when the code is compiled. When its wrapped in a function, the code isn't executed until that particular query is ran
  fields: () => ({
    id: { type: GraphQLID, description: 'ID of Author' },
    name: { type: GraphQLString, description: 'Name of Author' },
    age: { type: GraphQLInt, description: 'Age of Author' },
    // authors may have more than one book
    books: {
      type: new GraphQLList(BookType),
      resolve(parent) {
        const { id } = parent;
        // return _.filter(books, { authorID: id });
        return Book.find({ authorId: id });
      },
    },
  }),
});

// root queries
// how we jump into the graph
const Query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // book is the name of the query we will use on client
    // book {}
    // book by id
    book: {
      type: BookType,
      // when someone queries this BookType, we expect to pass arguments to find books
      // define what arguments get passed along with query
      // book(id: "123") {}
      args: {
        id: { type: GraphQLID },
      },
      // database models
      resolve(parent, { id }) {
        // use id to grab the book from our DB
        // const { id } = args;
        // use lodash to look through books array to find a book by its id
        // return _.find(books, { id });
        return Book.findById(id);
      },
    },
    // author query
    // author by id
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, { id }) {
        // return _.find(authors, { id });
        return Author.findById(id);
      },
    },
    // because we setup relationship between book and author
    // we can also use books to get authors
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        // return books;
        return Book.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        // return authors;
        return Author.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      // expect the client to send data
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, { name, age }) {
        const author = new Author({ name, age });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve(parent, { name, genre, authorId }) {
        const book = new Book({ name, genre, authorId });
        return book.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
