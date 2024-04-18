import { FINANCIAL_DETAILS } from '../../constants';
import generateKey from '../encrypt/generate-key';
import generateDecipher from './generate-decipher';
import generateBufferInStringFormat from './generate-buffer';
import { EncryptedData } from '../../types';

const { ENCODING, OUTPUT_ENCODING } = FINANCIAL_DETAILS.ENCRYPTION.CIPHER;

const key = generateKey();

/**
 * decryptData
 * uses key, initialisation and decipher to decrypt provided encrypted value
 * createDecipheriv creates a new decipher object in same format as the created cipher for encryption
 * decipher.update processes encrypted text in hex encoding and produces decrypted output in utf-8 format
 * decipher.final finishes the process and produces the last portion of decrypted data in utf-8 format
 * @param {EncryptedData} dataToDecrypt
 * @returns {String} decrypted string
 */
const decryptData = (dataToDecrypt: EncryptedData) => {
  const { value, iv } = dataToDecrypt;

  // creates buffer in string format
  const buffer = generateBufferInStringFormat(value);

  // creates decipher in same format as the cipher used for encryption
  const decipher = generateDecipher(key, iv);

  // processes encrypted text in hex and produces utf-8 decrypted output
  const decipherUpdate = decipher.update(buffer, ENCODING, OUTPUT_ENCODING);

  // finalises decryption process for last portion of decrypted data in utf-8 format
  const decipherFinal = decipher.final(OUTPUT_ENCODING);

  return decipherUpdate.concat(decipherFinal);
};

const decrypt = {
  decrypt: decryptData,
};

export default decrypt;
