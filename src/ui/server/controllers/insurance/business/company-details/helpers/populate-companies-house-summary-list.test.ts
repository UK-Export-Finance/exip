import { populateCompaniesHouseSummaryList, mapDatabaseResponse } from './populate-companies-house-summary-list';
import mapSicCodes from '../../../../../helpers/mappings/map-sic-codes';
import { companyHouseSummaryList } from '../../../../../helpers/summary-lists/company-house-summary-list';
import { FIELD_IDS } from '../../../../../constants';
import { mockApplication } from '../../../../../test-mocks';
import { ApplicationCompany } from '../../../../../../types';

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: { COMPANY_NUMBER, COMPANY_SIC, INDUSTRY_SECTOR_NAMES, SIC_CODE, INDUSTRY_SECTOR_NAME },
  },
} = FIELD_IDS.INSURANCE;

describe('controllers/insurance/business/companies-details/helpers/populate-companies-house-summary-list', () => {
  describe('populateCompaniesHouseSummaryList', () => {
    describe(`when no company ${COMPANY_NUMBER} is provided`, () => {
      it('should return null', () => {
        const company = {
          id: '12345',
        } as ApplicationCompany;

        const response = populateCompaniesHouseSummaryList(company);

        expect(response).toEqual(null);
      });

      it('should return mapped companies house summary list if company exists and is populated', () => {
        const company = {
          ...mockApplication.company,
        };

        const response = populateCompaniesHouseSummaryList(company);

        const expected = {
          ...company,
          [COMPANY_SIC]: mapSicCodes(company[COMPANY_SIC], SIC_CODE),
          [INDUSTRY_SECTOR_NAMES]: mapSicCodes(company[COMPANY_SIC], INDUSTRY_SECTOR_NAME),
        } as ApplicationCompany;

        expect(response).toEqual(companyHouseSummaryList(expected));
      });
    });
  });

  describe('mapDatabaseResponse', () => {
    it('should map company to required format', () => {
      const company = {
        ...mockApplication.company,
      };

      const response = mapDatabaseResponse(company);

      const expected = {
        ...company,
        [COMPANY_SIC]: mapSicCodes(company[COMPANY_SIC], SIC_CODE),
        [INDUSTRY_SECTOR_NAMES]: mapSicCodes(company[COMPANY_SIC], INDUSTRY_SECTOR_NAME),
      };

      expect(response).toEqual(expected);
    });
  });
});
