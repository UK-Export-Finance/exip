import { companyHouseSummaryList } from '../../../../../helpers/summary-lists/company-house-summary-list';
import mapSicCodes from '../../../../../helpers/mappings/map-sic-codes';
import { FIELD_IDS } from '../../../../../constants';
import { ApplicationExporterCompany } from '../../../../../../types';

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: { COMPANY_NUMBER, COMPANY_SIC },
  },
} = FIELD_IDS.INSURANCE;

/**
 * maps database response and returns body in correct format for summary list
 * @param {object} exporterCompany
 * @returns {CompanyHouseResponse} reformatted exporterCompany
 */
const mapDatabaseResponse = (exporterCompany: ApplicationExporterCompany): ApplicationExporterCompany => ({
  ...exporterCompany,
  [COMPANY_SIC]: mapSicCodes(exporterCompany[COMPANY_SIC]),
});

/**
 * receives exporterCompany and maps it to correct format and returns summaryList for company details
 * @param {object} exporterCompany
 * @returns {Array<SummaryListItemData>} summaryList for company details
 */
const populateCompaniesHouseSummaryList = (exporterCompany: ApplicationExporterCompany) => {
  if (!exporterCompany[COMPANY_NUMBER]) {
    return null;
  }

  const companyDetails = mapDatabaseResponse(exporterCompany);

  return companyHouseSummaryList(companyDetails);
};

export { populateCompaniesHouseSummaryList, mapDatabaseResponse };
