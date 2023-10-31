import mapSicCodes from '../map-sic-codes';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import { ApplicationCompany } from '../../../../types';

const {
  COMPANIES_HOUSE: { COMPANY_SIC, INDUSTRY_SECTOR_NAMES, SIC_CODE, INDUSTRY_SECTOR_NAME },
} = INSURANCE_FIELD_IDS;

/**
 * mapSicCodesAndIndustrySectors
 * Map company SIC codes and industry sector names
 * So that the data can be consumed in a summary list
 * @param {Object} Company
 * @returns {Object} Mapped company
 */
const mapSicCodesAndIndustrySectors = (company: ApplicationCompany): ApplicationCompany => ({
  ...company,
  [COMPANY_SIC]: mapSicCodes(company[COMPANY_SIC], SIC_CODE),
  [INDUSTRY_SECTOR_NAMES]: mapSicCodes(company[COMPANY_SIC], INDUSTRY_SECTOR_NAME),
});

export default mapSicCodesAndIndustrySectors;
