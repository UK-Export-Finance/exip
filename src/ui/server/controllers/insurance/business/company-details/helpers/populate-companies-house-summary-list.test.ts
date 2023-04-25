import { populateCompaniesHouseSummaryList, mapDatabaseResponse } from './populate-companies-house-summary-list';
import mapSicCodes from '../../../../../helpers/mappings/map-sic-codes';
import { companyHouseSummaryList } from '../../../../../helpers/summary-lists/company-house-summary-list';
import { FIELD_IDS } from '../../../../../constants';
import { mockApplication } from '../../../../../test-mocks';
import { ApplicationExporterCompany } from '../../../../../../types';

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: { COMPANY_NUMBER, COMPANY_SIC, INDUSTRY_SECTOR_NAMES, SIC_CODE, INDUSTRY_SECTOR_NAME },
  },
} = FIELD_IDS.INSURANCE;

describe('controllers/insurance/business/companies-details/helpers/populate-companies-house-summary-list', () => {
  describe('populateCompaniesHouseSummaryList', () => {
    describe(`when no exporterCompany ${COMPANY_NUMBER} is provided`, () => {
      it('should return null', () => {
        const exporterCompany = {
          id: '12345',
        } as ApplicationExporterCompany;

        const response = populateCompaniesHouseSummaryList(exporterCompany);

        expect(response).toEqual(null);
      });

      it('should return mapped companies house summary list if exporterCompany exists and is populated', () => {
        const exporterCompany = {
          ...mockApplication.exporterCompany,
        };

        const response = populateCompaniesHouseSummaryList(exporterCompany);

        const expected = {
          ...exporterCompany,
          [COMPANY_SIC]: mapSicCodes(exporterCompany[COMPANY_SIC], SIC_CODE),
          [INDUSTRY_SECTOR_NAMES]: mapSicCodes(exporterCompany[COMPANY_SIC], INDUSTRY_SECTOR_NAME),
        } as ApplicationExporterCompany;

        expect(response).toEqual(companyHouseSummaryList(expected));
      });
    });
  });

  describe('mapDatabaseResponse', () => {
    it('should map exporterCompany to required format', () => {
      const exporterCompany = {
        ...mockApplication.exporterCompany,
      };

      const response = mapDatabaseResponse(exporterCompany);

      const expected = {
        ...exporterCompany,
        [COMPANY_SIC]: mapSicCodes(exporterCompany[COMPANY_SIC], SIC_CODE),
        [INDUSTRY_SECTOR_NAMES]: mapSicCodes(exporterCompany[COMPANY_SIC], INDUSTRY_SECTOR_NAME),
      };

      expect(response).toEqual(expected);
    });
  });
});
