import crypto from 'crypto';
import generateKey from '.';
import { FINANCIAL_DETAILS } from '../../../constants';

const { ALGORITHM, SIGNATURE, SUBSTRING_LOWER_VALUE, SUBSTRING_UPPER_VALUE } = FINANCIAL_DETAILS.ENCRYPTION.KEY;

describe('api/helpers/encrypt/generate-key', () => {
  const key = crypto.createHash(ALGORITHM).update(SIGNATURE).digest('hex').substring(SUBSTRING_LOWER_VALUE, SUBSTRING_UPPER_VALUE);

  it('should return a valid key', () => {
    const result = generateKey();

    expect(result.length).toEqual(key.length);
  });
});
