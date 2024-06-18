import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import mapApplicationSicCodeValues from './application';
import mapEligibilitySicCodeValues from './eligibility';
import { ApplicationCompany, Company } from '../../../../../types';

const {
  COMPANIES_HOUSE: { COMPANY_SIC, INDUSTRY_SECTOR_NAMES },
} = INSURANCE_FIELD_IDS;

/**
 * generateSicCodesValue
 * Generate SIC codes value for a summary list row value.
 * If a isApplicationData flag is passed, call application SIC codes mapping function.
 * Otherwise, call eligibility SIC codes mapping function.
 * Application and eligibility have different companies house data structure.
 * Therefore, we need to map them differently.
 * @param {Object} company: Company data
 * @param {Boolean} isApplicationData: Company data has an application structure.
 * @returns {String} Mapped SIC codes
 */
const generateSicCodesValue = (company: Company | ApplicationCompany, isApplicationData?: boolean) => {
  if (isApplicationData) {
    return mapApplicationSicCodeValues(company[COMPANY_SIC]);
  }

  return mapEligibilitySicCodeValues(company[COMPANY_SIC], company[INDUSTRY_SECTOR_NAMES]);
};

export default generateSicCodesValue;
