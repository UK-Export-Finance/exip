import crypto from 'crypto';
import { FINANCIAL_DETAILS } from '../../../constants';

const { ENCRYPTION_METHOD } = FINANCIAL_DETAILS.ENCRYPTION.CIPHER;

/**
 * generateDecipher
 * generates decipher to enable encrypted value to be decrypted
 * @param {string} key: generated key
 * @param {string} iv: initialisation vector
 * @returns {Decipher} decipher
 */
const generateDecipher = (key: string, iv: string) => {
  try {
    return crypto.createDecipheriv(ENCRYPTION_METHOD, key, iv);
  } catch (error) {
    console.error('Error generating decipher %o', error);

    throw new Error(`Error generating decipher ${error}`);
  }
};
export default generateDecipher;
