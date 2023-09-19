import mapShortTermCoverAvailable from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const {
  CIS: { SHORT_TERM_COVER_AVAILABLE },
} = EXTERNAL_API_DEFINITIONS;

describe('helpers/map-cis-countries/map-cis-country/map-short-term-cover-available', () => {
  describe(`when the short term cover is ${SHORT_TERM_COVER_AVAILABLE.YES}`, () => {
    it('should return true', () => {
      const result = mapShortTermCoverAvailable(SHORT_TERM_COVER_AVAILABLE.YES);

      expect(result).toEqual(true);
    });
  });

  describe(`when the short term cover is ${SHORT_TERM_COVER_AVAILABLE.ILC}`, () => {
    it('should return true', () => {
      const result = mapShortTermCoverAvailable(SHORT_TERM_COVER_AVAILABLE.ILC);

      expect(result).toEqual(true);
    });
  });

  describe(`when the short term cover is ${SHORT_TERM_COVER_AVAILABLE.CILC}`, () => {
    it('should return true', () => {
      const result = mapShortTermCoverAvailable(SHORT_TERM_COVER_AVAILABLE.CILC);

      expect(result).toEqual(true);
    });
  });

  describe(`when the short term cover is ${SHORT_TERM_COVER_AVAILABLE.REFER}`, () => {
    it('should return true', () => {
      const result = mapShortTermCoverAvailable(SHORT_TERM_COVER_AVAILABLE.REFER);

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
