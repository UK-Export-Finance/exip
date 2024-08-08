import crypto from 'crypto';
import { FINANCIAL_DETAILS } from '../../../constants';

const { ENCRYPTION_METHOD } = FINANCIAL_DETAILS.ENCRYPTION.CIPHER;

/**
 * generateDecipher
 * generates decipher to enable encrypted value to be decrypted
 * @param {String} key: generated key
 * @param {String} iv: initialisation vector
 * @returns {Decipher} decipher
 */
const generateDecipher = (key: string, iv: string) => {
  try {
    return crypto.createDecipheriv(ENCRYPTION_METHOD, key, iv);
  } catch (error) {
    console.error('Error generating decipher %O', error);

    throw new Error(`Error generating decipher ${error}`);
  }
};
export default generateDecipher;
