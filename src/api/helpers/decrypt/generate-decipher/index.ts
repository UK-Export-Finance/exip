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
const generateDecipher = (key: string, iv: string) => crypto.createDecipheriv(ENCRYPTION_METHOD, key, iv);

export default generateDecipher;
