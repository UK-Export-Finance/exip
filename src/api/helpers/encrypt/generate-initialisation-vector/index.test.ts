import crypto from 'crypto';
import generateInitialisationVector from '.';
import { FINANCIAL_DETAILS } from '../../../constants';

const { BYTES_SIZE, ENCODING, SLICE_INDEX_START, SLICE_INDEX_END } = FINANCIAL_DETAILS.ENCRYPTION.IV;

describe('api/helpers/encrypt/initialisation-vector', () => {
  const iv = crypto.randomBytes(BYTES_SIZE).toString(ENCODING).slice(SLICE_INDEX_START, SLICE_INDEX_END);

  it('should return a valid initialisation vector', () => {
    const result = generateInitialisationVector();

    expect(result.length).toEqual(iv.length);
  });
});
