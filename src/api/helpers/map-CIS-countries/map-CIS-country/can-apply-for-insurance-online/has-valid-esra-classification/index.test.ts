import hasValidEsraClassification from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../../../../constants';

const {
  CIS: {
    ESRA_CLASSIFICATION: { STANDARD, HIGH, VERY_HIGH },
  },
} = EXTERNAL_API_DEFINITIONS;

describe('helpers/map-CIS-countries/map-CIS-country/can-apply-for-insurance-online/has-valid-esra-classification', () => {
  describe(`when the classification is ${STANDARD}`, () => {
    it('should return true', () => {
      const result = hasValidEsraClassification(STANDARD);

      expect(result).toEqual(true);
    });
  });

  describe(`when the classification is ${HIGH}`, () => {
    it('should return true', () => {
      const result = hasValidEsraClassification(HIGH);

      expect(result).toEqual(true);
    });
  });

  describe(`when the classification is ${VERY_HIGH}`, () => {
    it('should return true', () => {
      const result = hasValidEsraClassification(VERY_HIGH);

      expect(result).toEqual(true);
    });
  });

  describe('when the classification is unrecognised', () => {
    it('should return false', () => {
      const result = hasValidEsraClassification('Some other classification');

      expect(result).toEqual(false);
    });
  });
});
