import isValidEmail from '.';
import { mockValidEmail } from '../../test-mocks';

describe('shared-validation/is-valid-email', () => {
  describe('when an email does not contain an @ symbol', () => {
    it('should return false', () => {
      const mockEmail = 'mockemail.com';

      const result = isValidEmail(mockEmail);

      expect(result).toEqual(false);
    });
  });

  describe('when an email does not contain at least one dot', () => {
    it('should return false', () => {
      const mockEmail = 'mock@emailcom';

      const result = isValidEmail(mockEmail);

      expect(result).toEqual(false);
    });
  });

  describe('when an email contains a space', () => {
    it('should return false', () => {
      const mockEmail = 'mock @email.com';

      const result = isValidEmail(mockEmail);

      expect(result).toEqual(false);
    });
  });

  describe('when an email does not contain a domain', () => {
    it('should return false', () => {
      const mockEmail = 'mock@email';

      const result = isValidEmail(mockEmail);

      expect(result).toEqual(false);
    });
  });

  describe('when an email is valid', () => {
    it('should return true', () => {
      const result = isValidEmail(mockValidEmail);

      expect(result).toEqual(true);
    });
  });
});
