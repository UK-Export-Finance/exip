import crypto from 'crypto';
import { FINANCIAL_DETAILS } from '../../constants';
import generateKey from './generate-key';
import generateInitialisationVector from './generate-initialisation-vector';
import { FinancialDetailsEncryption } from '../../types';

const { ENCRYPTION_METHOD, ENCODING, STRING_ENCODING, OUTPUT_ENCODING } = FINANCIAL_DETAILS.ENCRYPTION.CIPHER;

/**
 * encrypt
 * encrypts data
 * returns encrypted value and initialisation vector
 * @param dataToEncrypt
 * @returns {FinancialDetailsEncryption} value and initialisation vector
 */
const encrypt = (dataToEncrypt: string): FinancialDetailsEncryption => {
  // generate the key
  const key = generateKey();
  // generate the initialisation vector
  const iv = generateInitialisationVector();

  const cipher = crypto.createCipheriv(ENCRYPTION_METHOD, key, iv);

  return {
    value: Buffer.from(cipher.update(dataToEncrypt, OUTPUT_ENCODING, ENCODING) + cipher.final(ENCODING)).toString(STRING_ENCODING),
    iv,
  };
};

export default encrypt;
