import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import { mockJointlyInsuredParty } from '../../../../../test-mocks';
import mapSubmittedData from '.';

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { REQUESTED, COMPANY_NAME, COMPANY_NUMBER, COUNTRY },
} = POLICY_FIELD_IDS;

describe('controllers/insurance/policy/map-submitted-data/jointly-insured-party', () => {
  describe(`when ${REQUESTED} is false`, () => {
    const mockBody = {
      [REQUESTED]: false,
      mockOtherField: true,
    };

    it('should return form data as provided', () => {
      const result = mapSubmittedData(mockBody);

      const expected = mockBody;

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${REQUESTED} is false`, () => {
    it('should nullify all other fields', () => {
      const mockBody = {
        ...mockJointlyInsuredParty,
        [REQUESTED]: false,
      };

      const result = mapSubmittedData(mockBody);

      const expected = {
        ...mockBody,
        [COMPANY_NAME]: '',
        [COMPANY_NUMBER]: '',
        [COUNTRY]: null,
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
