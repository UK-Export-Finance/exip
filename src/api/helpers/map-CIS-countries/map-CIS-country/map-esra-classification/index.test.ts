import mapEsraClassification from '.';
import { EXTERNAL_API_DEFINITIONS, EXTERNAL_API_MAPPINGS } from '../../../../constants';
import { RiskClassifications } from '../../../../types';

const { CIS } = EXTERNAL_API_DEFINITIONS;

describe('helpers/map-cis-countries/map-cis-country/map-esra-classification', () => {
  describe(`when the risk is '${CIS.ESRA_CLASSIFICATION.STANDARD}'`, () => {
    it('should return simplified string', () => {
      const str = CIS.ESRA_CLASSIFICATION.STANDARD;

      const result = mapEsraClassification(str);

      const expected = EXTERNAL_API_MAPPINGS.CIS.ESRA_CLASSIFICATION.STANDARD as RiskClassifications;

      expect(result).toEqual(expected);
    });
  });

  describe(`when the risk is '${CIS.ESRA_CLASSIFICATION.HIGH}'`, () => {
    it('should return the string', () => {
      const str = CIS.ESRA_CLASSIFICATION.HIGH;

      const result = mapEsraClassification(str);

      const expected = EXTERNAL_API_MAPPINGS.CIS.ESRA_CLASSIFICATION.HIGH as RiskClassifications;

      expect(result).toEqual(expected);
    });
  });

  describe(`when the risk is '${CIS.ESRA_CLASSIFICATION.VERY_HIGH}'`, () => {
    it('should return the string', () => {
      const str = CIS.ESRA_CLASSIFICATION.VERY_HIGH;

      const result = mapEsraClassification(str);

      const expected = EXTERNAL_API_MAPPINGS.CIS.ESRA_CLASSIFICATION.VERY_HIGH as RiskClassifications;

      expect(result).toEqual(expected);
    });
  });

  it('should return null', () => {
    const str = 'None';

    const result = mapEsraClassification(str);

    expect(result).toBeNull();
  });
});
