import crypto from 'crypto';
import { FINANCIAL_DETAILS } from '../../constants';

const { KEY, IV, ALGORITHM, ENCRYPTION_METHOD, ENCODING, STRING_ENCODING, OUTPUT_ENCODING } = FINANCIAL_DETAILS.ENCRYPTION;

const key = crypto.createHash(ALGORITHM).update(KEY.SIGNATURE).digest('hex').substring(0, 32);
// initialisation vector
const iv = crypto.randomBytes(IV.BYTES).toString(IV.ENCODING);

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
