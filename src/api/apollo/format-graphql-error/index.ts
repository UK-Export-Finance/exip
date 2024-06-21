import 'dotenv/config';
import { GraphQLFormattedError } from '.keystone.types'; // eslint-disable-line
import { ValidationError } from 'apollo-server-express';

/**
 * When running in a non-development environment,
 * when an invalid GraphQL request is received,
 * Instead of returning an error with schema suggestions,
 * Return a generic "invalid request" error.
 * @param {GraphQLFormattedError} GraphQL error
 * @returns {ValidationError}
 */
export const formatGraphQlError = (err: GraphQLFormattedError): GraphQLFormattedError => {
  const isDevEnvironment = process.env.NODE_ENV === 'development';

  if (!isDevEnvironment) {
    return new ValidationError('Invalid request');
  }

  return err;
};

export default formatGraphQlError;
