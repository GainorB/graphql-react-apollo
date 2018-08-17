require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const Schema = require('./schema/Schema');

const port = process.env.PORT || 4000;
const app = express();

// connect to db
mongoose.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds123562.mlab.com:23562/gql-books-tutorial`,
  { useNewUrlParser: true }
);
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});
// allow cross origin requests
app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema: Schema, // describes how our graph looks
    graphiql: true,
    pretty: true,
  })
);

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
