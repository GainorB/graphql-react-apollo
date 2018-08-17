import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from './App';

// SET UP APOLLOCLIENT
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // ENDPOINT WE MAKE REQUESTS TO
});

if (process.env.NODE_ENV === 'development') {
  window.console.log('Environment =>', process.env.NODE_ENV);
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('app')
);
