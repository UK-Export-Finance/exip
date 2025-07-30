import generatePolicyAndDateFields from './policy-and-date-fields';
import generatePolicyContactFields from './policy-contact-fields';
import { generateOtherCompanyFields } from './other-company-fields';
import { generateBrokerFields } from './broker-fields';
import { generateLossPayeeFields } from './loss-payee-fields';
import generateGroupsOfSummaryLists from '../generate-groups-of-summary-lists';
import { SummaryListParamsPolicy, SummaryListGroupData } from '../../../../types';

/**
 * generateFields
 * Create all fields for the insurance - Type of policy govukSummaryList
 * @param {object} policy: Submitted "policy" data
 * @param {object} policyContact: Submitted "policy contact" data
 * @param {object} broker: Submitted "broker" data
 * @param {object} nominatedLossPayee: Submitted "Nominated loss payee" data
 * @param {number} referenceNumber: Application reference number
 * @param {Array<Currency>} currencies: Currencies
 * @param {Array<Country>} countries: Countries
 * @param {boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {object} All policy values in an object structure for GOVUK summary list structure
 */
const generateFields = ({
  policy,
  policyContact,
  broker,
  nominatedLossPayee,
  referenceNumber,
  currencies,
  countries,
  checkAndChange,
}: SummaryListParamsPolicy): Array<SummaryListGroupData> => {
  const fields = [
    generatePolicyAndDateFields(policy, referenceNumber, currencies, checkAndChange),
    generatePolicyContactFields(policyContact, referenceNumber, checkAndChange),
    generateOtherCompanyFields(policy.jointlyInsuredParty, referenceNumber, countries, checkAndChange),
    generateBrokerFields(broker, referenceNumber, checkAndChange),
    generateLossPayeeFields(nominatedLossPayee, referenceNumber, checkAndChange),
  ] as Array<SummaryListGroupData>;

  return fields;
};

/**
 * policySummaryLists
 * Create multiple groups with govukSummaryList data structure
 * @param {ApplicationPolicy} policy: Policy answers/submitted data in a simple object/text structure
 * @param {ApplicationPolicyContact} policyContact: Policy contact answers/submitted data in a simple object/text structure
 * @param {ApplicationBroker} broker: Broker answers/submitted data in a simple object/text structure
 * @param {ApplicationNominatedLossPayee} nominatedLossPayee: Nominated loss payee answers/submitted data in a simple object/text structure
 * @param {number} referenceNumber: Application reference number
 * @param {Array<Currency>} currencies: Currencies
 * @param {Array<Country>} countries: Countries
 * @param {boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {object} Multiple groups with multiple fields/answers in govukSummaryList data structure
 */
const policySummaryLists = ({
  policy,
  policyContact,
  broker,
  nominatedLossPayee,
  referenceNumber,
  currencies,
  countries,
  checkAndChange,
}: SummaryListParamsPolicy) => {
  const fields = generateFields({
    policy,
    policyContact,
    broker,
    nominatedLossPayee,
    referenceNumber,
    currencies,
    countries,
    checkAndChange,
  });

  const summaryList = generateGroupsOfSummaryLists(fields);

  return summaryList;
};

export { generateFields, policySummaryLists };
