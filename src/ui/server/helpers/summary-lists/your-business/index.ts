import generateYourCompanyFields from './your-company-fields';
import generateNatureOfYourBusinessFields from './nature-of-your-business-fields';
import generateTurnoverFields from './turnover-fields';
import generateCreditControlFields from './credit-control-fields';
import generateGroupsOfSummaryLists from '../generate-groups-of-summary-lists';
import { ApplicationCompany, ApplicationBusiness, SummaryListGroupData } from '../../../../types';

/**
 * generateFields
 * Create all fields for the insurance - Your business govukSummaryList
 * @param {ApplicationCompany} company: Application company object
 * @param {ApplicationBusiness} business: Application business object
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} checkAndChange true if coming from check your answers section in submit application section
 * @returns {Object} All your business values in an object structure for GOVUK summary list structure
 */
const generateFields = (
  company: ApplicationCompany,
  business: ApplicationBusiness,
  referenceNumber: number,
  checkAndChange: boolean,
): Array<SummaryListGroupData> => {
  const fields = [
    generateYourCompanyFields(company, referenceNumber, checkAndChange),
    generateNatureOfYourBusinessFields(business, referenceNumber, checkAndChange),
    generateTurnoverFields(business, referenceNumber, checkAndChange),
    generateCreditControlFields(business, referenceNumber, checkAndChange),
  ] as Array<SummaryListGroupData>;

  return fields;
};

/**
 * yourBusinessSummaryLists
 * Create multiple groups with govukSummaryList data structure
 * @param {ApplicationCompany} company: Application company object
 * @param {ApplicationBusiness} business: Application business object
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} checkAndChange: true if coming from check your answers section in submit application section. Defaults to false
 * @returns {Object} Multiple groups with multiple fields/answers in govukSummaryList data structure
 */
const yourBusinessSummaryLists = (company: ApplicationCompany, business: ApplicationBusiness, referenceNumber: number, checkAndChange = false) => {
  const fields = generateFields(company, business, referenceNumber, checkAndChange);

  const summaryList = generateGroupsOfSummaryLists(fields);

  return summaryList;
};

export { generateFields, yourBusinessSummaryLists };
