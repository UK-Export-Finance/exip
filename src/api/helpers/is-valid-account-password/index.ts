import crypto from 'crypto';
import { ACCOUNT } from '../../constants';

const { ENCRYPTION } = ACCOUNT;

const {
  STRING_TYPE,
  PBKDF2: { ITERATIONS, DIGEST_ALGORITHM },
  PASSWORD: {
    PBKDF2: { KEY_LENGTH },
  },
} = ENCRYPTION;

/**
 * isValidAccountPassword
 * Check if the provided password is valid.
 * @param {String} Password
 * @param {String} Salt
 * @param {String} Hash
 * @returns {Booealn}
 */
const isValidAccountPassword = (password: string, salt: string, hash: string) => {
  console.info('Validating exporter account password');

  const hashVerify = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM).toString(STRING_TYPE);

  if (hash === hashVerify) {
    console.info('Valid exporter account password');

    return true;
  }

  console.info('Invalid exporter account password');

  return false;
};

export default isValidAccountPassword;
