import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import getCountryByIsoCode from '../../../../../helpers/get-country-by-iso-code';
import { mockApplication, mockCountries, mockJointlyInsuredParty } from '../../../../../test-mocks';
import mapSubmittedData from '.';

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { REQUESTED, COMPANY_NAME, COMPANY_NUMBER, COUNTRY },
} = POLICY_FIELD_IDS;

describe('controllers/insurance/policy/map-submitted-data/jointly-insured-party', () => {
  describe(`when form body ${REQUESTED} is true`, () => {
    const mockBody = {
      [REQUESTED]: 'true',
      [COUNTRY]: mockApplication.policy.jointlyInsuredParty.country,
      mockOtherField: 'true',
    };

    it('should return form data as provided, but with country mapping', () => {
      const result = mapSubmittedData(mockBody, mockApplication, mockCountries);

      const expected = {
        ...mockBody,
        [COUNTRY]: getCountryByIsoCode(mockCountries, mockBody[COUNTRY]).isoCode,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when form body ${REQUESTED} and application ${REQUESTED} are both false`, () => {
    it('should nullify all other fields', () => {
      const mockBody = {
        ...mockJointlyInsuredParty,
        [REQUESTED]: 'false',
      };

      const result = mapSubmittedData(mockBody, mockApplication, mockCountries);

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

      const result = mapSubmittedData(mockBody, mockApplication, mockCountries);

      const expected = mockBody;

      expect(result).toEqual(expected);
    });
  });
});
