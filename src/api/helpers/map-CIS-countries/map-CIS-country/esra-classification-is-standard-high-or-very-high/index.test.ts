import esraClassificationIsStandardHighOrVeryHigh from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const {
  CIS: {
    ESRA_CLASSIFICATION: { STANDARD, HIGH, VERY_HIGH, NONE },
  },
} = EXTERNAL_API_DEFINITIONS;

describe('helpers/map-CIS-countries/map-CIS-country/can-apply-for-insurance-online/has-valid-esra-classification', () => {
  describe(`when the classification is ${STANDARD}`, () => {
    it('should return true', () => {
      const result = esraClassificationIsStandardHighOrVeryHigh(STANDARD);

      expect(result).toEqual(true);
    });
  });

  describe(`when the classification is ${HIGH}`, () => {
    it('should return true', () => {
      const result = esraClassificationIsStandardHighOrVeryHigh(HIGH);

      expect(result).toEqual(true);
    });
  });

  describe(`when the classification is ${VERY_HIGH}`, () => {
    it('should return true', () => {
      const result = esraClassificationIsStandardHighOrVeryHigh(VERY_HIGH);

      expect(result).toEqual(true);
    });
  });

  describe(`when the classification is ${NONE}`, () => {
    it('should return false', () => {
      const result = esraClassificationIsStandardHighOrVeryHigh(NONE);

      expect(result).toEqual(false);
    });
  });

  describe('when the classification is unrecognised', () => {
    it('should return false', () => {
      const result = esraClassificationIsStandardHighOrVeryHigh('Some other classification');

      expect(result).toEqual(false);
    });
  });
});
