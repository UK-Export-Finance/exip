import hasValidShortTermCover from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../../../../constants';

const {
  CIS: {
    SHORT_TERM_COVER: { YES, REFER, UNLISTED, NO, ILC, CILC },
  },
} = EXTERNAL_API_DEFINITIONS;

describe('helpers/map-CIS-countries/map-CIS-country/can-apply-for-insurance-online/has-valid-short-term-cover', () => {
  const validShortTermCovers = [YES, REFER, UNLISTED];

  const invalidShortTermCovers = [NO, ILC, CILC, 'Some other shortTermCover value'];

  describe.each(validShortTermCovers)('valid short term covers', (shortTermCover) => {
    it(`should return true for ${shortTermCover}`, () => {
      const result = hasValidShortTermCover(shortTermCover);

      expect(result).toEqual(true);
    });
  });

  describe.each(invalidShortTermCovers)('invalid short term covers', (shortTermCover) => {
    it(`should return false for ${shortTermCover}`, () => {
      const result = hasValidShortTermCover(shortTermCover);

      expect(result).toEqual(false);
    });
  });
});
