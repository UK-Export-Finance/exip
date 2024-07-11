import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import generateSicCodesValue from '.';
import mapApplicationSicCodeValues from './application';
import mapEligibilitySicCodeValues from './eligibility';
import { mockCompany } from '../../../../test-mocks';

const {
  COMPANIES_HOUSE: { COMPANY_SIC, INDUSTRY_SECTOR_NAMES },
} = INSURANCE_FIELD_IDS;

describe('server/helpers/summary-lists/companies-house/generate-sic-codes-value', () => {
  describe('when isApplicationData flag is passed', () => {
    it('should return the result of mapApplicationSicCodeValues', () => {
      const isApplicationData = true;

      const result = generateSicCodesValue(mockCompany, isApplicationData);

      const expected = mapApplicationSicCodeValues(mockCompany[COMPANY_SIC]);

      expect(result).toEqual(expected);
    });
  });

  describe('when isApplicationData flag is NOT passed', () => {
    it('should return the result of mapEligibilitySicCodeValues', () => {
      const result = generateSicCodesValue(mockCompany);

      const expected = mapEligibilitySicCodeValues(mockCompany[COMPANY_SIC], mockCompany[INDUSTRY_SECTOR_NAMES]);

      expect(result).toEqual(expected);
    });
  });
});
