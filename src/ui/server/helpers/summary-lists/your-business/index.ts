import generateSummaryListRows from '../generate-summary-list-rows';
import generateYourCompanyFields from './your-company-fields';
import generateNatureOfYourBusinessFields from './nature-of-your-business-fields';
import { ApplicationExporterCompany, ApplicationExporterBusiness, SummaryListItemData } from '../../../../types';

/**
 * generateFields
 * Create all fields for the insurance - Your business govukSummaryList
 * @param {ApplicationExporterCompany} answersExporterCompany application exporterCompany object
 * @param {ApplicationExporterBusiness} anwersExporterBusiness application exporterCompany object
 * @param {Number} referenceNumber Application reference number
 * @returns {Object} All your business values in an object structure for GOVUK summary list structure
 */
const generateFields = (answersExporterCompany: ApplicationExporterCompany, anwersExporterBusiness: ApplicationExporterBusiness, referenceNumber: number) => {
  let fields = [] as Array<SummaryListItemData>;

  fields = [
    ...generateYourCompanyFields(answersExporterCompany, referenceNumber),
    ...generateNatureOfYourBusinessFields(anwersExporterBusiness, referenceNumber),
  ];

  return fields;
};

/**
 * yourBusinessSummaryList
 * Create multiple groups with govukSummaryList data structure
 * @param {ApplicationExporterCompany} answersExporterCompany application exporterCompany object
 * @param {ApplicationExporterBusiness} anwersExporterBusiness application exporterBusiness object
 * @param {Number} referenceNumber Application reference number
 * @returns {Object} Multiple groups with multiple fields/answers in govukSummaryList data structure
 */
const yourBusinessSummaryList = (
  answersExporterCompany: ApplicationExporterCompany,
  anwersExporterBusiness: ApplicationExporterBusiness,
  referenceNumber: number,
) => {
  const fields = generateFields(answersExporterCompany, anwersExporterBusiness, referenceNumber);

  const summaryList = generateSummaryListRows(fields);

  return summaryList;
};

export { generateFields, yourBusinessSummaryList };
