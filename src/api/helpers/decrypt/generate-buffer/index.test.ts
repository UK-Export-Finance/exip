import generateBufferInStringFormat from '.';
import { FINANCIAL_DETAILS } from '../../../constants';

const { STRING_ENCODING, OUTPUT_ENCODING } = FINANCIAL_DETAILS.ENCRYPTION.CIPHER;

describe('api/helpers/decrypt/generate-buffer', () => {
  const value = 'testValue';
  const buffer = Buffer.from(value, STRING_ENCODING).toString(OUTPUT_ENCODING);

  it('should return a valid buffer', () => {
    const result = generateBufferInStringFormat(value);

    expect(result.length).toEqual(buffer.length);
  });

  describe('empty string provided', () => {
    it('should return an error', () => {
      try {
        generateBufferInStringFormat('');
      } catch (err) {
        const errorString = String(err);

        expect(errorString.includes('Error generating buffer')).toEqual(true);
      }
    });
  });
});
