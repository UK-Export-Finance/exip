import crypto from 'crypto';
import { FINANCIAL_DETAILS } from '../../constants';
import generateKey from './generate-key';
import generateInitialisationVector from './generate-initialisation-vector';
import encrypt from '.';

const { ENCRYPTION_METHOD, ENCODING, STRING_ENCODING, OUTPUT_ENCODING } = FINANCIAL_DETAILS.ENCRYPTION.CIPHER;

const iv = generateInitialisationVector();

const key = generateKey();

const cipher = crypto.createCipheriv(ENCRYPTION_METHOD, key, iv);

describe('api/helpers/encrypt', () => {
  const dataToEncrypt = 'mockString';

  describe('when an undefined string is provided', () => {
    it('should return an object with empty strings for value and iv', () => {
      const result = encrypt();

      const expected = {
        value: '',
        iv: '',
      };

      expect(result).toEqual(expected);
    });
  });

  it('should return a value', () => {
    const result = encrypt(dataToEncrypt);

    const expected = Buffer.from(cipher.update(dataToEncrypt, OUTPUT_ENCODING, ENCODING) + cipher.final(ENCODING)).toString(STRING_ENCODING);

    expect(result.value.length).toEqual(expected.length);
  });

  it('should return an initialisation vector', () => {
    const result = encrypt(dataToEncrypt);

    expect(result.iv.length).toEqual(iv.length);
  });
});
