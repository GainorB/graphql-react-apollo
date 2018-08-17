const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// FAKE DB
const books = [
  { name: 'Name of the Wind', genre: 'Fantasy', id: '1' },
  { name: 'Harry Potter', genre: 'Fantasy', id: '2' },
  { name: 'JS for Dummies', genre: 'Educational', id: '3' },
];

// describes the BookType
const BookType = new GraphQLObjectType({
  name: 'Book',
  // fields are our properties
  // will help overcome reference errors when we have multiple types
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
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
        id: { type: GraphQLString },
      },
      // database models
      resolve(parent, args) {
        // use id to grab the book from our DB
        const { id } = args;
        // use lodash to look through books array to find a book by its id
        return _.find(books, { id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
