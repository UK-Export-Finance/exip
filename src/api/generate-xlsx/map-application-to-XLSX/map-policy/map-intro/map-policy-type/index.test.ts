import mapPolicyType from '.';
import { APPLICATION } from '../../../../../constants';

const {
  POLICY_TYPE: { ABBREVIATED, MULTIPLE, SINGLE },
} = APPLICATION;

describe('api/generate-xlsx/map-application-to-xlsx/map-policy/map-intro/map-policy-type', () => {
  describe(`when the policy type is ${SINGLE}`, () => {
    it(`should return ${ABBREVIATED.SINGLE}`, () => {
      const result = mapPolicyType(SINGLE);

      expect(result).toEqual(ABBREVIATED.SINGLE);
    });
  });

  describe(`when the policy type is ${MULTIPLE}`, () => {
    it(`should return ${ABBREVIATED.MULTIPLE}`, () => {
      const result = mapPolicyType(MULTIPLE);

      expect(result).toEqual(ABBREVIATED.MULTIPLE);
    });
  });
});
