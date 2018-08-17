const express = require('express');
const graphqlHTTP = require('express-graphql');
const RootQuery = require('./schema/Schema');

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: RootQuery, // describes how our graph looks
    graphiql: true,
    pretty: true,
  })
);

app.listen(4000, () => {
  console.log('Server running on port 4000');
});
