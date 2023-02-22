import generateSummaryListRows from '../generate-summary-list-rows';
import generateYourCompanyFields from './your-company-fields';
import { ApplicationExporterCompany, SummaryListItemData } from '../../../../types';

/**
 * generateFields
 * Create all fields for the insurance - Your business govukSummaryList
 * @param {ApplicationExporterCompany} answersExporterCompany application exporterCompany object
 * @param {number} referenceNumber application reference number
 * @returns {Object} All your business values in an object structure for GOVUK summary list structure
 */
const generateFields = (answers: ApplicationExporterCompany, referenceNumber: number) => {
  let fields = [] as Array<SummaryListItemData>;

  fields = generateYourCompanyFields(answers, referenceNumber);

  return fields;
};

/**
 * yourBusinessSummaryList
 * Create multiple groups with govukSummaryList data structure
 * @param {ApplicationExporterCompany} answersExporterCompany application exporterCompany object
 * @param {number} referenceNumber application reference number
 * @returns {Object} Multiple groups with multiple fields/answers in govukSummaryList data structure
 */
const yourBusinessSummaryList = (answersExporterCompany: ApplicationExporterCompany, referenceNumber: number) => {
  const fields = generateFields(answersExporterCompany, referenceNumber);

  const summaryList = generateSummaryListRows(fields);

  return summaryList;
};

export { generateFields, yourBusinessSummaryList };
