import getTrueAndFalseAnswers from '../get-true-and-false-answers';
import INSURANCE_FIELD_IDS from '../../constants/field-ids/insurance';
import { Application, ApplicationBroker, ApplicationExportContractAgent, ApplicationFlat, ApplicationPolicyContact } from '../../../types';

const {
  POLICY: {
    NAME_ON_POLICY: { IS_SAME_AS_OWNER, POSITION, POLICY_CONTACT_EMAIL },
    USING_BROKER,
    BROKER_DETAILS: { NAME, BROKER_EMAIL, FULL_ADDRESS },
  },
  EXPORT_CONTRACT: {
    AGENT_DETAILS: { AGENT_NAME, AGENT_FULL_ADDRESS, AGENT_COUNTRY_CODE, COUNTRY_CODE },
  },
  ACCOUNT: { FIRST_NAME, LAST_NAME, EMAIL },
} = INSURANCE_FIELD_IDS;

/**
 * mapPolicyContact
 * maps policyContact and replaces email with POLICY_CONTACT_EMAIL for task list
 * POLICY_CONTACT_EMAIL - has dot notation to stop clashes with other email fields.
 * @param {ApplicationPolicyContact} policyContact
 * @returns {Object}
 */
export const mapPolicyContact = (policyContact: ApplicationPolicyContact) => ({
  id: policyContact.id,
  [IS_SAME_AS_OWNER]: policyContact[IS_SAME_AS_OWNER],
  [FIRST_NAME]: policyContact[FIRST_NAME],
  [LAST_NAME]: policyContact[LAST_NAME],
  [POLICY_CONTACT_EMAIL]: policyContact[EMAIL],
  [POSITION]: policyContact[POSITION],
});

/**
 * mapBroker
 * Map the broker, replacing EMAIL with BROKER_EMAIL for task list
 * BROKER_EMAIL - has dot notation to stop clashes with other email fields.
 * @param {ApplicationBroker} broker
 * @returns {Object} ApplicationBroker with slightly different field names
 */
export const mapBroker = (broker: ApplicationBroker) => ({
  id: broker.id,
  [USING_BROKER]: broker[USING_BROKER],
  [NAME]: broker[NAME],
  [BROKER_EMAIL]: broker[EMAIL],
  [FULL_ADDRESS]: broker[FULL_ADDRESS],
});

/**
 * mapExportContractAgentDetails
 * Map the agent replacing NAME with BROKER_EMAIL for task list
 * AGENT_NAME - has dot notation to stop clashes with other name fields.
 * @param {ApplicationExportContractAgent} agent
 * @returns {Object} ApplicationExportContractAgent with slightly different field names
 */
export const mapExportContractAgentDetails = (agent: ApplicationExportContractAgent) => ({
  id: agent.id,
  ...getTrueAndFalseAnswers(agent),
  [AGENT_NAME]: agent[NAME],
  [AGENT_FULL_ADDRESS]: agent[FULL_ADDRESS],
  [AGENT_COUNTRY_CODE]: agent[COUNTRY_CODE],
});

/**
 * flattenApplicationData
 * Transform an application into a single level object
 * @param {Application}
 * @returns {Object} Application as a single level object
 */
const flattenApplicationData = (application: Application): ApplicationFlat => {
  const { broker, business, buyer, company, declaration, exportContract, nominatedLossPayee, policy, policyContact, sectionReview } = application;
  const { buyerTradingHistory, contact, relationship } = buyer;

  const flattened = {
    ...application.eligibility,
    version: application.version,
    referenceNumber: application.referenceNumber,
    createdAt: application.createdAt,
    updatedAt: application.updatedAt,
    dealType: application.dealType,
    submissionCount: application.submissionCount,
    submissionDeadline: application.submissionDeadline,
    submissionType: application.submissionType,
    submissionDate: application.submissionDate,
    status: application.status,
    buyerCountry: application.eligibility?.buyerCountry?.isoCode,
    ...business,
    ...mapBroker(broker),
    ...buyer,
    ...buyerTradingHistory,
    ...company,
    ...contact,
    ...exportContract,
    ...getTrueAndFalseAnswers(exportContract),
    ...exportContract.privateMarket,
    ...getTrueAndFalseAnswers(exportContract.privateMarket),
    ...mapExportContractAgentDetails(exportContract.agent),
    ...getTrueAndFalseAnswers(declaration),
    // TODO: EMS-2772, EMS-2815
    // ...nominatedLossPayee,
    ...getTrueAndFalseAnswers(nominatedLossPayee),
    ...relationship,
    ...policy,
    ...policy.jointlyInsuredParty,
    ...mapPolicyContact(policyContact),
    ...getTrueAndFalseAnswers(sectionReview),
  };

  return flattened;
};

export default flattenApplicationData;
