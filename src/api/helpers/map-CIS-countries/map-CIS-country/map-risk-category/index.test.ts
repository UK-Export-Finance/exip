import mapRiskCategory from '.';
import { EXTERNAL_API_DEFINITIONS, EXTERNAL_API_MAPPINGS } from '../../../../constants';

const { CIS } = EXTERNAL_API_DEFINITIONS;

describe('helpers/map-cis-countries/map-cis-country/map-risk-category', () => {
  describe(`when the risk is '${CIS.RISK.STANDARD}'`, () => {
    it('should return simplified string', () => {
      const str = CIS.RISK.STANDARD;

      const result = mapRiskCategory(str);

      const expected = EXTERNAL_API_MAPPINGS.CIS.RISK.STANDARD;

      expect(result).toEqual(expected);
    });
  });

  describe(`when the risk is '${CIS.RISK.HIGH}'`, () => {
    it('should return the string', () => {
      const str = CIS.RISK.HIGH;

      const result = mapRiskCategory(str);

      expect(result).toEqual(str);
    });
  });

  describe(`when the risk is '${CIS.RISK.VERY_HIGH}'`, () => {
    it('should return the string', () => {
      const str = CIS.RISK.VERY_HIGH;

      const result = mapRiskCategory(str);

      expect(result).toEqual(str);
    });
  });

  it('should return null', () => {
    const str = 'None';

    const result = mapRiskCategory(str);

    expect(result).toEqual(null);
  });
});
