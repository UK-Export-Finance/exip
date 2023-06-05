import generateSummaryListRows from '../generate-summary-list-rows';
import generateYourCompanyFields from './your-company-fields';
import generateBusinessContactFields from './contact-fields';
import generateNatureOfYourBusinessFields from './nature-of-your-business-fields';
import generateTurnoverFields from './turnover-fields';
import { generateBrokerFields } from './broker-fields';
import { ApplicationCompany, ApplicationBusiness, ApplicationBroker, SummaryListItemData } from '../../../../types';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';

const { EXPORTER_BUSINESS: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  CONTACT: { BUSINESS_CONTACT_DETAIL },
} = FIELD_IDS;

/**
 * generateFields
 * Create all fields for the insurance - Your business govukSummaryList
 * @param {ApplicationCompany} answersCompany Application company object
 * @param {ApplicationBusiness} answersBusiness Application company object
 * @param {Number} referenceNumber
 * @returns {Object} All your business values in an object structure for GOVUK summary list structure
 */
const generateFields = (
  answersCompany: ApplicationCompany,
  answersBusiness: ApplicationBusiness,
  answersBroker: ApplicationBroker,
  referenceNumber: number,
  checkAndChange: boolean,
) => {
  let fields = [] as Array<SummaryListItemData>;
  fields = [
    ...generateYourCompanyFields(answersCompany, referenceNumber, checkAndChange),
    ...generateBusinessContactFields(answersBusiness[BUSINESS_CONTACT_DETAIL], referenceNumber, checkAndChange),
    ...generateNatureOfYourBusinessFields(answersBusiness, referenceNumber, checkAndChange),
    ...generateTurnoverFields(answersBusiness, referenceNumber, checkAndChange),
    ...generateBrokerFields(answersBroker, referenceNumber, checkAndChange),
  ];

  return fields;
};

/**
 * yourBusinessSummaryList
 * Create multiple groups with govukSummaryList data structure
 * @param {ApplicationCompany} answersCompany Application company object
 * @param {ApplicationBusiness} answersBusiness Application business object
 * @param {Number} referenceNumber
 * @param {Boolean} checkAndChange true if coming from check your answers section in submit application section.  Default as false
 * @returns {Object} Multiple groups with multiple fields/answers in govukSummaryList data structure
 */
const yourBusinessSummaryList = (
  answersCompany: ApplicationCompany,
  answersBusiness: ApplicationBusiness,
  answersBroker: ApplicationBroker,
  referenceNumber: number,
  checkAndChange = false,
) => {
  const fields = generateFields(answersCompany, answersBusiness, answersBroker, referenceNumber, checkAndChange);

  const summaryList = generateSummaryListRows(fields);

  return summaryList;
};

export { generateFields, yourBusinessSummaryList };
