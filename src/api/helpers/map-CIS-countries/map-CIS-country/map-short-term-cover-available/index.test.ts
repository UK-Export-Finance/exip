import mapShortTermCoverAvailable from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const {
  CIS: { SHORT_TERM_COVER },
} = EXTERNAL_API_DEFINITIONS;

describe('helpers/map-cis-countries/map-cis-country/map-short-term-cover-available', () => {
  describe(`when the short term cover is ${SHORT_TERM_COVER.YES}`, () => {
    it('should return true', () => {
      const result = mapShortTermCoverAvailable(SHORT_TERM_COVER.YES);

      expect(result).toEqual(true);
    });
  });

  describe(`when the short term cover is ${SHORT_TERM_COVER.ILC}`, () => {
    it('should return true', () => {
      const result = mapShortTermCoverAvailable(SHORT_TERM_COVER.ILC);

      expect(result).toEqual(true);
    });
  });

  describe(`when the short term cover is ${SHORT_TERM_COVER.CILC}`, () => {
    it('should return true', () => {
      const result = mapShortTermCoverAvailable(SHORT_TERM_COVER.CILC);

      expect(result).toEqual(true);
    });
  });

  describe(`when the short term cover is ${SHORT_TERM_COVER.REFER}`, () => {
    it('should return true', () => {
      const result = mapShortTermCoverAvailable(SHORT_TERM_COVER.REFER);

      expect(result).toEqual(true);
    });
  });

  describe('when the short term cover is not recognised', () => {
    it('should return false', () => {
      const result = mapShortTermCoverAvailable('Not recognised');

      expect(result).toEqual(false);
    });
  });
});
