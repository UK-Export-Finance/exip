import getPasswordHash from '../get-password-hash';

/**
 * isValidAccountPassword
 * Check if the provided password is valid.
 * @param {string} Password
 * @param {string} Salt
 * @param {string} Hash
 * @returns {boolean}
 */
const isValidAccountPassword = (password: string, salt: string, hash: string) => {
  console.info('Validating account password');

  const hashVerify = getPasswordHash(password, salt);

  if (hash === hashVerify) {
    console.info('Valid account password');

    return true;
  }

  console.info('Invalid account password');

  return false;
};

export default isValidAccountPassword;
