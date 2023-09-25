import crypto from 'crypto';
import { ACCOUNT } from '../../constants';

const { ENCRYPTION } = ACCOUNT;

const {
  RANDOM_BYTES_SIZE,
  STRING_TYPE,
  PBKDF2: { ITERATIONS, DIGEST_ALGORITHM },
  PASSWORD: {
    PBKDF2: { KEY_LENGTH },
  },
} = ENCRYPTION;

/**
 * encryptPassword
 * Encrypt a password
 * @param {String} Password to encrypt
 * @param {Object} Password salt and hash
 */
const encryptPassword = (password: string) => {
  const salt = crypto.randomBytes(RANDOM_BYTES_SIZE).toString(STRING_TYPE);

  const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM).toString(STRING_TYPE);

  return {
    salt,
    hash,
  };
};

export default encryptPassword;
