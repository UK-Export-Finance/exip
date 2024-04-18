import crypto from 'crypto';
import generateDecipher from '.';
import generateKey from '../../encrypt/generate-key';
import { FINANCIAL_DETAILS } from '../../../constants';
import { mockIV } from '../../../test-mocks';

const { ENCRYPTION_METHOD } = FINANCIAL_DETAILS.ENCRYPTION.CIPHER;

describe('api/helpers/decrypt/generate-decipher', () => {
  const key = generateKey();
  const iv = mockIV;
  const decipher = crypto.createDecipheriv(ENCRYPTION_METHOD, key, iv);

  it('should return a valid key', () => {
    const result = generateDecipher(key, iv);

    expect(result.length).toEqual(decipher.length);
  });
});
