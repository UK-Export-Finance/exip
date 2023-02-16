import crypto from 'crypto';
import { ACCOUNT } from '../constants';
import isValidAccountPassword from './is-valid-account-password';

const { PASSWORD } = ACCOUNT;

const {
  RANDOM_BYTES_SIZE,
  STRING_TYPE,
  PBKDF2: { ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM },
} = PASSWORD;

describe('api/helpers/is-valid-account-password', () => {
  const mockPassword = 'AmazingPassword123!';

  const salt = crypto.randomBytes(RANDOM_BYTES_SIZE).toString(STRING_TYPE);

  const hash = crypto.pbkdf2Sync(mockPassword, salt, ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM).toString(STRING_TYPE);

  describe('when password is valid', () => {
    it('should return false', () => {
      const result = isValidAccountPassword(mockPassword, salt, hash);

      expect(result).toEqual(true);
    });
  });

  describe('when password is invalid', () => {
    it('should return false', () => {
      const result = isValidAccountPassword('IncorrectPassword123!', salt, hash);

      expect(result).toEqual(false);
    });
  });
});
