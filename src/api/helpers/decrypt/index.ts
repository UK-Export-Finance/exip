import crypto from 'crypto';
import dotenv from 'dotenv';
import { FINANCIAL_DETAILS } from '../../constants';
import generateKey from '../encrypt/generate-key';

dotenv.config();

const { ENCRYPTION_METHOD, ENCODING, STRING_ENCODING, OUTPUT_ENCODING } = FINANCIAL_DETAILS.ENCRYPTION;

const key = generateKey();

const decrypt = (dataToDecrypt: any) => {
  const buff = Buffer.from(dataToDecrypt.value, STRING_ENCODING);
  const decipher = crypto.createDecipheriv(ENCRYPTION_METHOD, key, dataToDecrypt.iv);

  return decipher.update(buff.toString(OUTPUT_ENCODING), ENCODING, OUTPUT_ENCODING) + decipher.final(OUTPUT_ENCODING);
};

export default decrypt;