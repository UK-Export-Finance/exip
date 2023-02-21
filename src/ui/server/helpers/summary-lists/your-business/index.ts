import generateSummaryListRows from '../generate-summary-list-rows';
import generateYourCompanyFields from './your-company-fields';
import { ApplicationExporterCompany, SummaryListItemData } from '../../../../types';

/**
 * generateFields
 * Create all fields for the insurance - Your business govukSummaryList
 * @param {Object} All submitted your business data
 * @returns {Object} All your business values in an object structure for GOVUK summary list structure
 */
const generateFields = (answers: ApplicationExporterCompany, referenceNumber: number) => {
  let fields = [] as Array<SummaryListItemData>;

  fields = generateYourCompanyFields(answers, referenceNumber);

  fields = [...fields];

  return fields;
};

/**
 * yourBusinessSummaryList
 * Create multiple groups with govukSummaryList data structure
 * @param {Object} All answers/submitted data in a simple object.text structure
 * @returns {Object} Multiple groups with multiple fields/answers in govukSummaryList data structure
 */
const yourBusinessSummaryList = (answersExporterCompany: ApplicationExporterCompany, referenceNumber: number) => {
  const fields = generateFields(answersExporterCompany, referenceNumber);

  const summaryList = generateSummaryListRows(fields);

  return summaryList;
};

export { generateFields, yourBusinessSummaryList };
