import { populateCompaniesHouseSummaryList, mapDatabaseResponse } from './populate-companies-house-summary-list';
import { companyHouseSummaryList } from '../../../../../helpers/summary-lists/company-house-summary-list';
import { FIELD_IDS } from '../../../../../constants';
import { mockApplication } from '../../../../../test-mocks';
import { CompanyHouseResponse } from '../../../../../../types';

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: { COMPANY_NAME, COMPANY_NUMBER, COMPANY_INCORPORATED, COMPANY_SIC, COMPANY_ADDRESS },
  },
} = FIELD_IDS.INSURANCE;

describe('controllers/insurance/business/companies-details/helpers/populate-companies-house-summary-list', () => {
  describe('populateCompaniesHouseSummaryList', () => {
    describe(`when no exporterCompany ${COMPANY_NUMBER} is provided`, () => {
      it('should return null', () => {
        const exporterCompany = {
          id: '12345',
        };

        const response = populateCompaniesHouseSummaryList(exporterCompany);

        expect(response).toEqual(null);
      });

      it('should return null', () => {
        const exporterCompany = {
          id: '12345',
        };

        const response = populateCompaniesHouseSummaryList(exporterCompany);

        expect(response).toEqual(null);
      });

      it('should return mapped companies house summary list if exporterCompany exists and is populated', () => {
        const exporterCompany = {
          ...mockApplication.exporterCompany,
        };

        const response = populateCompaniesHouseSummaryList(exporterCompany);

        const expected = {
          [COMPANY_NAME]: exporterCompany[COMPANY_NAME],
          [COMPANY_ADDRESS]: {
            ...exporterCompany[COMPANY_ADDRESS],
          },
          [COMPANY_NUMBER]: exporterCompany[COMPANY_NUMBER],
          [COMPANY_INCORPORATED]: exporterCompany[COMPANY_INCORPORATED],
          [COMPANY_SIC]: [exporterCompany[COMPANY_SIC][0].sicCode],
        } as CompanyHouseResponse;

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
        [COMPANY_NAME]: exporterCompany[COMPANY_NAME],
        [COMPANY_ADDRESS]: {
          ...exporterCompany[COMPANY_ADDRESS],
        },
        [COMPANY_NUMBER]: exporterCompany[COMPANY_NUMBER],
        [COMPANY_INCORPORATED]: exporterCompany[COMPANY_INCORPORATED],
        [COMPANY_SIC]: [exporterCompany[COMPANY_SIC][0].sicCode],
      };

      expect(response).toEqual(expected);
    });
  });
});
