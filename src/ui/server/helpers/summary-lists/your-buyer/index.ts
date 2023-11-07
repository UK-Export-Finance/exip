import generateSummaryListRows from '../generate-summary-list-rows';
import generateCompanyOrOrganisationFields from './company-or-organisation';
import workingWithBuyerFields from './working-with-buyer';
import { SummaryListItemData, ApplicationBuyer } from '../../../../types';

/**
 * generateFields
 * Create all fields for the insurance - Your business govukSummaryList
 * @param {ApplicationBuyer} answersCompany Application buyer object
 * @param {Number} referenceNumber
 * @returns {Object} All your business values in an object structure for GOVUK summary list structure
 */
const generateFields = (answersBuyer: ApplicationBuyer, referenceNumber: number, checkAndChange: boolean) => {
  const fields = [
    ...generateCompanyOrOrganisationFields(answersBuyer, referenceNumber, checkAndChange),
    ...workingWithBuyerFields(answersBuyer, referenceNumber, checkAndChange),
  ] as Array<SummaryListItemData>;

  return fields;
};

/**
 * yourBuyerSummaryList
 * Create multiple groups with govukSummaryList data structure
 * @param {ApplicationBuyer} answersCompany Application buyer object
 * @param {Number} referenceNumber
 * @returns {Object} Multiple groups with multiple fields/answers in govukSummaryList data structure
 */
const yourBuyerSummaryList = (answersBuyer: ApplicationBuyer, referenceNumber: number, checkAndChange = false) => {
  const fields = generateFields(answersBuyer, referenceNumber, checkAndChange);

  const summaryList = generateSummaryListRows(fields);

  return summaryList;
};

export { generateFields, yourBuyerSummaryList };
