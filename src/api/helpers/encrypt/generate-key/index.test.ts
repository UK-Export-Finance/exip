import crypto from 'crypto';
import generateKey from '.';
import { FINANCIAL_DETAILS } from '../../../constants';

const { ALGORITHM, SIGNATURE, SUBSTRING_INDEX_START, SUBSTRING_INDEX_END } = FINANCIAL_DETAILS.ENCRYPTION.KEY;

describe('api/helpers/encrypt/generate-key', () => {
  const key = crypto.createHash(ALGORITHM).update(SIGNATURE).digest('hex').substring(SUBSTRING_INDEX_START, SUBSTRING_INDEX_END);

  it('should return a valid key', () => {
    const result = generateKey();

    expect(result.length).toEqual(key.length);
  });
});
