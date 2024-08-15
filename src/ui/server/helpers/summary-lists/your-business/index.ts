import generateYourCompanyFields from './your-company-fields';
import generateNatureOfYourBusinessFields from './nature-of-your-business-fields';
import generateTurnoverFields from './turnover-fields';
import generateCreditControlFields from './credit-control-fields';
import generateGroupsOfSummaryLists from '../generate-groups-of-summary-lists';
import { SummaryListGroupData, SummaryListParamsBusiness } from '../../../../types';

/**
 * generateFields
 * Create all fields for the insurance - Your business govukSummaryList
 * @param {ApplicationBusiness} business: Application business object
 * @param {ApplicationCompany} company: Application company object
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} checkAndChange true if coming from check your answers section in submit application section
 * @returns {Object} All your business values in an object structure for GOVUK summary list structure
 */
const generateFields = ({ business, company, referenceNumber, checkAndChange }: SummaryListParamsBusiness): Array<SummaryListGroupData> => {
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
 * @param {ApplicationBusiness} business: Application business object
 * @param {ApplicationCompany} company: Application company object
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} checkAndChange: true if coming from check your answers section in submit application section. Defaults to false
 * @returns {Object} Multiple groups with multiple fields/answers in govukSummaryList data structure
 */
const yourBusinessSummaryLists = ({ business, company, referenceNumber, checkAndChange }: SummaryListParamsBusiness) => {
  const fields = generateFields({ business, company, referenceNumber, checkAndChange });

  const summaryList = generateGroupsOfSummaryLists(fields);

  return summaryList;
};

export { generateFields, yourBusinessSummaryLists };
