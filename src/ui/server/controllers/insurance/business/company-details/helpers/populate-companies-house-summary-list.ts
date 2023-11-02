import { companyHouseSummaryList } from '../../../../../helpers/summary-lists/company-house-summary-list';
import mapSicCodes from '../../../../../helpers/mappings/map-sic-codes';
import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import { ApplicationCompany } from '../../../../../../types';

const {
  COMPANIES_HOUSE: { COMPANY_NUMBER, COMPANY_SIC, INDUSTRY_SECTOR_NAMES, SIC_CODE, INDUSTRY_SECTOR_NAME },
} = INSURANCE_FIELD_IDS;

/**
 * maps database response and returns body in correct format for summary list
 * @param {object} company
 * @returns {CompaniesHouseResponse} reformatted company
 */
const mapDatabaseResponse = (company: ApplicationCompany): ApplicationCompany => ({
  ...company,
  [COMPANY_SIC]: mapSicCodes(company[COMPANY_SIC], SIC_CODE),
  [INDUSTRY_SECTOR_NAMES]: mapSicCodes(company[COMPANY_SIC], INDUSTRY_SECTOR_NAME),
});

/**
 * receives company and maps it to correct format and returns summaryList for company details
 * @param {object} company
 * @returns {Array<SummaryListItemData>} summaryList for company details
 */
const populateCompaniesHouseSummaryList = (company: ApplicationCompany) => {
  if (!company[COMPANY_NUMBER]) {
    return null;
  }

  const companyDetails = mapDatabaseResponse(company);

  return companyHouseSummaryList(companyDetails);
};

export { populateCompaniesHouseSummaryList, mapDatabaseResponse };
