import ApolloClient from "apollo-boost";
import fetch from 'node-fetch';

export default new ApolloClient({
  uri: '/graphql',
  fetch: fetch
});