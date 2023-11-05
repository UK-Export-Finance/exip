import { queryParams } from '.';
import { replaceCharactersWithCharacterCode } from '../../helpers/sanitise-data';
import { mockAccount, mockReq, mockRes } from '../../test-mocks';
import { Request, Response } from '../../../types';

describe('middleware/query-params', () => {
  const req: Request = mockReq();
  const res: Response = mockRes();

  const nextSpy = jest.fn();
  const statusSpy = jest.fn();

  res.status = statusSpy;

  req.query = {};

  const mockId = 'mock-id';
  const mockToken = 'mock-token';

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('when query params is populated with a single allowed param (id)', () => {
    it('should sanitise and return the param', () => {
      req.query = {
        id: mockId,
      };

      queryParams(req, res, nextSpy);

      const expected = {
        id: replaceCharactersWithCharacterCode(mockId),
      };

      expect(req.query).toEqual(expected);
    });
  });

  describe('when query params is populated with a single allowed param (token)', () => {
    it('should sanitise and return the param', () => {
      req.query = {
        token: mockToken,
      };

      queryParams(req, res, nextSpy);

      const expected = {
        token: replaceCharactersWithCharacterCode(mockToken),
      };

      expect(req.query).toEqual(expected);
    });
  });

  describe('when query params is populated with a both  allowed params (token and ID)', () => {
    it('should sanitise and return the params', () => {
      req.query = {
        token: mockToken,
        id: mockAccount.id,
      };

      queryParams(req, res, nextSpy);

      const expected = {
        token: replaceCharactersWithCharacterCode(mockToken),
        id: replaceCharactersWithCharacterCode(mockAccount.id),
      };

      expect(req.query).toEqual(expected);
    });
  });

  describe('when query params is populated with multiple params over MAXIMUM_PARAMS', () => {
    it('should return 400 status', () => {
      req.query = {
        id: mockId,
        token: mockToken,
        // @ts-ignore
        notAllowed: 'mock',
      };

      queryParams(req, res, nextSpy);

      expect(statusSpy).toHaveBeenCalledWith(400);
    });
  });

  describe('when no params are provided', () => {
    it('should call next()', () => {
      req.query = {};

      queryParams(req, res, nextSpy);

      expect(nextSpy).toHaveBeenCalledTimes(1);
    });
  });
});
