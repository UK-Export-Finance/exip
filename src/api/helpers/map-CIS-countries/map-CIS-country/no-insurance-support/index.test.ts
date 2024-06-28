import noInsuranceSupportAvailable from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const {
  CIS: { NO_COVER },
} = EXTERNAL_API_DEFINITIONS;

describe('helpers/map-CIS-countries/map-CIS-country/no-insurance-support', () => {
  describe(`when marketRiskAppetitePublicDesc is ${NO_COVER}`, () => {
    it('should return true', () => {
      const result = noInsuranceSupportAvailable(NO_COVER);

      expect(result).toEqual(true);
    });
  });

  describe(`when originalShortTermCover is NOT '${NO_COVER}'`, () => {
    it('should return false', () => {
      const result = noInsuranceSupportAvailable('');

      expect(result).toEqual(false);
    });
  });
});
