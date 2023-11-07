import dotenv from 'dotenv';
import crypto from 'crypto';
import { ACCOUNT } from '../../constants';
import isValidAccountPassword from '.';

dotenv.config();

const { ENCRYPTION } = ACCOUNT;

const {
  RANDOM_BYTES_SIZE,
  STRING_TYPE,
  PBKDF2: { ITERATIONS, DIGEST_ALGORITHM },
  PASSWORD: {
    PBKDF2: { KEY_LENGTH },
  },
} = ENCRYPTION;

describe('api/helpers/is-valid-account-password', () => {
  const mockPassword = String(process.env.MOCK_ACCOUNT_PASSWORD);

  const salt = crypto.randomBytes(RANDOM_BYTES_SIZE).toString(STRING_TYPE);

  const hash = crypto.pbkdf2Sync(mockPassword, salt, ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM).toString(STRING_TYPE);

  describe('when password is valid', () => {
    it('should return true', () => {
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
