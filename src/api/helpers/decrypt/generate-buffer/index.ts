import { FINANCIAL_DETAILS } from '../../../constants';

const { STRING_ENCODING, OUTPUT_ENCODING } = FINANCIAL_DETAILS.ENCRYPTION.CIPHER;

/**
 * generateBufferInStringFormat
 * generates buffer for decryption using STRING_ENCODING and OUTPUT_ENCODING
 * @param {String} value
 * @returns {Buffer}
 */
const generateBufferInStringFormat = (value: string) => {
  try {
    return Buffer.from(value, STRING_ENCODING).toString(OUTPUT_ENCODING);
  } catch (error) {
    console.error('Error generating buffer %O', error);
    throw new Error(`Error generating buffer ${error}`);
  }
};

export default generateBufferInStringFormat;
