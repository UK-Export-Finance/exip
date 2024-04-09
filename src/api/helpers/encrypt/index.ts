import crypto from 'crypto';
import { FINANCIAL_DETAILS } from '../../constants';
import generateKey from './generate-key';
import generateIv from './generate-iv';

const { ENCRYPTION_METHOD, ENCODING, STRING_ENCODING, OUTPUT_ENCODING } = FINANCIAL_DETAILS.ENCRYPTION;

const key = generateKey();
// initialisation vector
const iv = generateIv();

/**
 * encrypt
 * encrypts data
 * returns encrypted value and initialisation vector
 * @param dataToEncrypt
 * @returns {Object} value and inititialisation vector
 */
const encrypt = (dataToEncrypt: any) => {
  const cipher = crypto.createCipheriv(ENCRYPTION_METHOD, key, iv);

  return {
    value: Buffer.from(cipher.update(dataToEncrypt, OUTPUT_ENCODING, ENCODING) + cipher.final(ENCODING)).toString(STRING_ENCODING),
    iv,
  };
};

export default encrypt;
