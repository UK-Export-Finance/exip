import { companyHouseSummaryList } from '../../../../../helpers/summary-lists/company-house-summary-list';
import mapSicCodes from '../../../../../helpers/mappings/map-sic-codes';
import { FIELD_IDS } from '../../../../../constants';
import { CompanyHouseResponse } from '../../../../../../types';

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: { COMPANY_NAME, COMPANY_NUMBER, COMPANY_INCORPORATED, COMPANY_SIC, COMPANY_ADDRESS },
  },
} = FIELD_IDS.INSURANCE;

const mapDatabaseResponse = (exporterCompany: object) => {
  return {
    [COMPANY_NAME]: exporterCompany[COMPANY_NAME],
    [COMPANY_ADDRESS]: {
      ...exporterCompany[COMPANY_ADDRESS],
    },
    [COMPANY_NUMBER]: exporterCompany[COMPANY_NUMBER],
    [COMPANY_INCORPORATED]: exporterCompany[COMPANY_INCORPORATED],
    [COMPANY_SIC]: mapSicCodes(exporterCompany[COMPANY_SIC]),
  } as CompanyHouseResponse;
};

const populateCompaniesHouseSummaryList = (exporterCompany: object) => {
  if (!exporterCompany[COMPANY_NUMBER]) {
    return null;
  }

  const companyDetails = mapDatabaseResponse(exporterCompany);

  return companyHouseSummaryList(companyDetails);
};

export { populateCompaniesHouseSummaryList, mapDatabaseResponse };
