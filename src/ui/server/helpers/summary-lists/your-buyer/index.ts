import generateSummaryListRows from '../generate-summary-list-rows';
import generateCompanyOrOrganisationFields from './company-or-organisation';
import workingWithBuyerFields from './working-with-buyer';
import { SummaryListItemData, ApplicationBuyer } from '../../../../types';

/**
 * generateFields
 * Create all fields for the insurance - Your business govukSummaryList
 * @param {ApplicationBuyer} answersExporterCompany Application buyer object
 * @param {Number} referenceNumber
 * @returns {Object} All your business values in an object structure for GOVUK summary list structure
 */
const generateFields = (answersBuyer: ApplicationBuyer, referenceNumber: number) => {
  let fields = [] as Array<SummaryListItemData>;

  fields = [...generateCompanyOrOrganisationFields(answersBuyer, referenceNumber), ...workingWithBuyerFields(answersBuyer, referenceNumber)];

  return fields;
};

/**
 * yourBuyerSummaryList
 * Create multiple groups with govukSummaryList data structure
 * @param {ApplicationBuyer} answersExporterCompany Application buyer object
 * @param {Number} referenceNumber
 * @returns {Object} Multiple groups with multiple fields/answers in govukSummaryList data structure
 */
const yourBuyerSummaryList = (answersBuyer: ApplicationBuyer, referenceNumber: number) => {
  const fields = generateFields(answersBuyer, referenceNumber);

  const summaryList = generateSummaryListRows(fields);

  return summaryList;
};

export { generateFields, yourBuyerSummaryList };
