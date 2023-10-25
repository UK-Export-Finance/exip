import { ValidationError } from 'apollo-server-express';
import formatGraphQlError from '.';

const mockErr = {
  message: 'Mock error message',
};

describe('apollo/format-graphql-error/index', () => {
  describe('when NODE_ENV is NOT `development`', () => {
    it('should return a generic error message', () => {
      process.env = {
        NODE_ENV: 'not-development',
      };

      const result = formatGraphQlError(mockErr);

      const expected = new ValidationError('Invalid request');

      expect(result).toEqual(expected);
    });
  });

  describe('when NODE_ENV is `development`', () => {
    it('should return the provided error', () => {
      process.env = { NODE_ENV: 'development' };

      const result = formatGraphQlError(mockErr);
      const expected = mockErr;

      expect(result).toEqual(expected);
    });
  });
});
