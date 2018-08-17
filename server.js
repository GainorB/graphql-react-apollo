const express = require('express');
const graphqlHTTP = require('express-graphql');
const RootQuery = require('./schema/Schema');

const port = process.env.PORT || 4000;
const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: RootQuery, // describes how our graph looks
    graphiql: true,
    pretty: true,
  })
);

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
