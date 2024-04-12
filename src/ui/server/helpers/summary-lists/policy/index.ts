import generatePolicyAndDateFields from './policy-and-date-fields';
import generatePolicyContactFields from './policy-contact-fields';
import { generateOtherCompanyFields } from './other-company-fields';
import { generateBrokerFields } from './broker-fields';
import generateGroupsOfSummaryLists from '../generate-groups-of-summary-lists';
import { ApplicationPolicy, ApplicationPolicyContact, ApplicationBroker, Currency, Country, SummaryListGroupData } from '../../../../types';

/**
 * generateFields
 * Create all fields for the insurance - Type of policy govukSummaryList
 * @param {Object} answers: Submitted "policy" data
 * @param {Object} answersPolicyContact: Submitted "policy contact" data
 * @param {Object} answersBroker: Submitted "broker" data
 * @param {Integer} referenceNumber: Application reference number
 * @param {Array} currencies: Currencies
 * @param {Array<Country>} countries: Countries
 * @param {Boolean} checkAndChange: true if coming from check your answers section in submit application section
 * @returns {Object} All policy values in an object structure for GOVUK summary list structure
 */
const generateFields = (
  answers: ApplicationPolicy,
  answersPolicyContact: ApplicationPolicyContact,
  answersBroker: ApplicationBroker,
  referenceNumber: number,
  currencies: Array<Currency>,
  countries: Array<Country>,
  checkAndChange: boolean,
): Array<SummaryListGroupData> => {
  const fields = [
    generatePolicyAndDateFields(answers, referenceNumber, currencies, checkAndChange),
    generatePolicyContactFields(answersPolicyContact, referenceNumber, checkAndChange),
    generateOtherCompanyFields(answers.jointlyInsuredParty, referenceNumber, countries, checkAndChange),
    generateBrokerFields(answersBroker, referenceNumber, checkAndChange),
  ] as Array<SummaryListGroupData>;

  return fields;
};

/**
 * policySummaryLists
 * Create multiple groups with govukSummaryList data structure
 * @param {ApplicationPolicy} answers: policy answers/submitted data in a simple object/text structure
 * @param {ApplicationPolicyContact} answersPolicyContact: policyContact answers/submitted data in a simple object/text structure
 * @param {ApplicationBroker} answersBroker: broker answers/submitted data in a simple object/text structure
 * @param {Number} referenceNumber: Application reference number
 * @param {Array<Currency>} currencies: Currencies
 * @param {Array<Country>} countries: Countries
 * @param {Boolean} checkAndChange: true if coming from check your answers section in submit application section. Defaults to false
 * @returns {Object} Multiple groups with multiple fields/answers in govukSummaryList data structure
 */
const policySummaryLists = (
  answers: ApplicationPolicy,
  answersPolicyContact: ApplicationPolicyContact,
  answersBroker: ApplicationBroker,
  referenceNumber: number,
  currencies: Array<Currency>,
  countries: Array<Country>,
  checkAndChange = false,
) => {
  const fields = generateFields(answers, answersPolicyContact, answersBroker, referenceNumber, currencies, countries, checkAndChange);

  const summaryList = generateGroupsOfSummaryLists(fields);

  return summaryList;
};

export { generateFields, policySummaryLists };
