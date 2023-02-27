import generateSummaryListRows from '../generate-summary-list-rows';
import generateYourCompanyFields from './your-company-fields';
import generateNatureOfYourBusinessFields from './nature-of-your-business-fields';
import generateTurnoverFields from './turnover-fields';
import { generateBrokerFields } from './broker-fields';
import { ApplicationExporterCompany, ApplicationExporterBusiness, ApplicationExporterBroker, SummaryListItemData } from '../../../../types';

/**
 * generateFields
 * Create all fields for the insurance - Your business govukSummaryList
 * @param {ApplicationExporterCompany} answersExporterCompany Application exporterCompany object
 * @param {ApplicationExporterBusiness} answersExporterBusiness Application exporterCompany object
 * @param {Number} referenceNumber
 * @returns {Object} All your business values in an object structure for GOVUK summary list structure
 */
const generateFields = (
  answersExporterCompany: ApplicationExporterCompany,
  answersExporterBusiness: ApplicationExporterBusiness,
  answersExporterBroker: ApplicationExporterBroker,
  referenceNumber: number,
) => {
  let fields = [] as Array<SummaryListItemData>;

  fields = [
    ...generateYourCompanyFields(answersExporterCompany, referenceNumber),
    ...generateNatureOfYourBusinessFields(answersExporterBusiness, referenceNumber),
    ...generateTurnoverFields(answersExporterBusiness, referenceNumber),
    ...generateBrokerFields(answersExporterBroker, referenceNumber),
  ];

  return fields;
};

/**
 * yourBusinessSummaryList
 * Create multiple groups with govukSummaryList data structure
 * @param {ApplicationExporterCompany} answersExporterCompany Application exporterCompany object
 * @param {ApplicationExporterBusiness} answersExporterBusiness Application exporterBusiness object
 * @param {Number} referenceNumber
 * @returns {Object} Multiple groups with multiple fields/answers in govukSummaryList data structure
 */
const yourBusinessSummaryList = (
  answersExporterCompany: ApplicationExporterCompany,
  answersExporterBusiness: ApplicationExporterBusiness,
  answersExporterBroker: ApplicationExporterBroker,
  referenceNumber: number,
) => {
  const fields = generateFields(answersExporterCompany, answersExporterBusiness, answersExporterBroker, referenceNumber);

  const summaryList = generateSummaryListRows(fields);

  return summaryList;
};

export { generateFields, yourBusinessSummaryList };
