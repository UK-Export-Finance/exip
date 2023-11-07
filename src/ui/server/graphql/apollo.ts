import { ApolloClient, DefaultOptions, OperationVariables } from 'apollo-client';
import fetch from 'cross-fetch';
import { createHttpLink, FetchOptions } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { DocumentNode } from 'graphql';
import dotenv from 'dotenv';

dotenv.config();

const { API_URL, API_KEY } = process.env;

const createHttpLinkOptions = {
  uri: API_URL,
  fetch,
} as FetchOptions;

const httpLink = createHttpLink(createHttpLinkOptions);

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
} as DefaultOptions;

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions,
});

const doQuery = async (query: DocumentNode, variables: OperationVariables) => {
  try {
    return await client.query({
      query,
      variables,
      context: {
        headers: {
          'x-api-key': API_KEY,
        },
      },
    });
  } catch (err) {
    return err;
  }
};

const doMutate = async (mutation: DocumentNode, variables: OperationVariables) => {
  try {
    return await client.mutate({
      mutation,
      variables,
      context: {
        headers: {
          'x-api-key': API_KEY,
        },
      },
    });
  } catch (err) {
    return err;
  }
};

const apollo = async (method: string, query: DocumentNode, variables: OperationVariables) => {
  switch (method) {
    case 'POST':
    case 'PUT':
      return doMutate(query, variables);

    case 'GET':
    default:
      return doQuery(query, variables);
  }
};

export default apollo;
