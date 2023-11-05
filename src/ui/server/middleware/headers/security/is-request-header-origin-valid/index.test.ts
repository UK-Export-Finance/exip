import * as dotenv from 'dotenv';
import { mockReq } from '../../../../test-mocks';
import { Request } from '../../../../../types';
import isRequestHeaderOriginValid from '.';

dotenv.config();

describe('middleware/headers/security/is-request-header-origin-valid', () => {
  const req: Request = mockReq();

  const mockOrigin = req.hostname;

  describe('when the provided request header matches the origin', () => {
    it('should return true', () => {
      const mockRequestHeader = `https://${req.hostname}`;

      const result = isRequestHeaderOriginValid(mockOrigin, mockRequestHeader);

      expect(result).toEqual(true);
    });
  });

  describe('when the provided request header does NOT mach the origin', () => {
    it('should return false', () => {
      const mockRequestHeader = `https://${req.hostname}-invalid.com`;

      const result = isRequestHeaderOriginValid(mockOrigin, mockRequestHeader);

      expect(result).toEqual(false);
    });
  });

  describe('when the provided request header is not a valid url', () => {
    it('should return false', () => {
      const mockRequestHeader = 'invalid-url';

      const result = isRequestHeaderOriginValid(mockOrigin, mockRequestHeader);

      expect(result).toEqual(false);
    });
  });
});
