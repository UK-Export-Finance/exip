import { requestDidStart } from '.';
import { ALLOWED_GRAPHQL_RESOLVERS } from '../../constants';

describe('apollo/plugins/index', () => {
  describe("when a request's operationName is not allowed", () => {
    it('should throw an error', () => {
      const mockRequest = {
        operationName: 'testing',
      };

      try {
        requestDidStart().didResolveOperation({ request: mockRequest });
      } catch (err) {
        const expected = new Error('Operation not permitted');

        expect(err).toEqual(expected);
      }
    });
  });

  describe("when a request's operationName is allowed", () => {
    it('should not return anything (operation can continue)', () => {
      const mockRequest = {
        operationName: ALLOWED_GRAPHQL_RESOLVERS[0],
      };

      const result = requestDidStart().didResolveOperation({ request: mockRequest });

      expect(result).toBeUndefined();
    });
  });

  describe('when a request has an empty operationName', () => {
    it('should throw an error', () => {
      const mockRequest = {
        operationName: '',
      };

      try {
        requestDidStart().didResolveOperation({ request: mockRequest });
      } catch (err) {
        const expected = new Error('Operation not permitted');

        expect(err).toEqual(expected);
      }
    });
  });

  describe('when a request does not have an operationName', () => {
    it('should throw an error', () => {
      const mockRequest = {};

      try {
        requestDidStart().didResolveOperation({ request: mockRequest });
      } catch (err) {
        const expected = new Error('Operation not permitted');

        expect(err).toEqual(expected);
      }
    });
  });
});
