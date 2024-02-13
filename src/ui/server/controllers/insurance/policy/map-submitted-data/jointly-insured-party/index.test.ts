import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import { mockApplication, mockJointlyInsuredParty } from '../../../../../test-mocks';
import mapSubmittedData from '.';

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { REQUESTED, COMPANY_NAME, COMPANY_NUMBER, COUNTRY_CODE },
} = POLICY_FIELD_IDS;

describe('controllers/insurance/policy/map-submitted-data/jointly-insured-party', () => {
  describe(`when form body ${REQUESTED} is true`, () => {
    const mockBody = {
      [REQUESTED]: true,
      [COUNTRY_CODE]: mockApplication.policy.jointlyInsuredParty.countryCode,
      mockOtherField: true,
    };

    it('should return form data as provided', () => {
      const result = mapSubmittedData(mockBody);

      const expected = mockBody;

      expect(result).toEqual(expected);
    });
  });

  describe(`when form body ${REQUESTED} is false`, () => {
    it('should wipe all other fields', () => {
      const mockBody = {
        ...mockJointlyInsuredParty,
        [REQUESTED]: false,
      };

      const result = mapSubmittedData(mockBody);

      const expected = {
        ...mockBody,
        [COMPANY_NAME]: '',
        [COMPANY_NUMBER]: '',
        [COUNTRY_CODE]: '',
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${REQUESTED} is not provided`, () => {
    it('should return form data as provided', () => {
      const mockBody = {};

      const result = mapSubmittedData(mockBody);

      const expected = mockBody;

      expect(result).toEqual(expected);
    });
  });
});
