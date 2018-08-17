const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLInt } = graphql;

// FAKE DB
const books = [
  { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorID: '1' },
  { name: 'Harry Potter', genre: 'Fantasy', id: '2', authorID: '2' },
  { name: 'JS for Dummies', genre: 'Educational', id: '3', authorID: '3' },
  { name: 'TS for Dummies', genre: 'Educational', id: '4', authorID: '1' },
  { name: 'Calculus', genre: 'Educational', id: '5', authorID: '2' },
  { name: 'NY Times', genre: 'News', id: '6', authorID: '3' },
];

const authors = [
  { name: 'Gainor Bostwick', age: 28, id: '1' },
  { name: 'Roger Bostwick', age: 22, id: '2' },
  { name: 'Jr Bostwick', age: 24, id: '3' },
];

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
      // parent object contains the data that was passed through from the parent (Book)
      resolve(parent, args) {
        const { authorID } = parent;
        return _.find(authors, { id: authorID });
      },
    },
  }),
});

// describes the AuthorType
const AuthorType = new GraphQLObjectType({
  name: 'Author', // mandatory
  fields: () => ({
    id: { type: GraphQLID, description: 'ID of Author' },
    name: { type: GraphQLString, description: 'Name of Author' },
    age: { type: GraphQLInt, description: 'Age of Author' },
  }),
});

// root queries
// how we jump into the graph
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // book is the name of the query we will use on client
    // book {}
    book: {
      type: BookType,
      // when someone queries this BookType, we expect to pass arguments to find books
      // define what arguments get passed along with query
      // book(id: "123") {}
      args: {
        id: { type: GraphQLID },
      },
      // database models
      resolve(parent, args) {
        // use id to grab the book from our DB
        const { id } = args;
        // use lodash to look through books array to find a book by its id
        return _.find(books, { id });
      },
    },
    // author query
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, { id }) {
        return _.find(authors, { id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
