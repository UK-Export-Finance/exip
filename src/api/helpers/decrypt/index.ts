import crypto from 'crypto';
import dotenv from 'dotenv';
import { FINANCIAL_DETAILS } from '../../constants';
import generateKey from '../encrypt/generate-key';
import { FinancialDetailsEncryption } from '../../types';

dotenv.config();

const { ENCRYPTION_METHOD, ENCODING, STRING_ENCODING, OUTPUT_ENCODING } = FINANCIAL_DETAILS.ENCRYPTION.CIPHER;

const key = generateKey();

const decrypt = (dataToDecrypt: FinancialDetailsEncryption) => {
  const buff = Buffer.from(dataToDecrypt.value, STRING_ENCODING);
  const decipher = crypto.createDecipheriv(ENCRYPTION_METHOD, key, dataToDecrypt.iv);

  return decipher.update(buff.toString(OUTPUT_ENCODING), ENCODING, OUTPUT_ENCODING).concat(decipher.final(OUTPUT_ENCODING));
};

export default decrypt;
