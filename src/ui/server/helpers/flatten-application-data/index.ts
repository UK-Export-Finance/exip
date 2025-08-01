import getTrueAndFalseAnswers from '../get-true-and-false-answers';
import INSURANCE_FIELD_IDS from '../../constants/field-ids/insurance';
import mapBroker from './map-broker';
import { Application, ApplicationExportContractAgent, ApplicationFlat, ApplicationNominatedLossPayee, ApplicationPolicyContact } from '../../../types';

const {
  POLICY: {
    NAME_ON_POLICY: { IS_SAME_AS_OWNER, POSITION, POLICY_CONTACT_EMAIL },
    FINANCIAL_ADDRESS,
    LOSS_PAYEE: { IS_APPOINTED },
    LOSS_PAYEE_DETAILS: { LOSS_PAYEE_NAME, IS_LOCATED_INTERNATIONALLY, IS_LOCATED_IN_UK },
    LOSS_PAYEE_FINANCIAL_ADDRESS,
  },
  EXPORT_CONTRACT: {
    AGENT_DETAILS: { AGENT_NAME, AGENT_FULL_ADDRESS, AGENT_COUNTRY_CODE, COUNTRY_CODE, FULL_ADDRESS, NAME },
  },
  ACCOUNT: { FIRST_NAME, LAST_NAME, EMAIL },
} = INSURANCE_FIELD_IDS;

/**
 * mapExportContractAgentDetails
 * Map the agent to avoid clashes with other address fields.
 * AGENT_NAME - has dot notation to stop clashes with other name fields.
 * @param {ApplicationExportContractAgent} agent
 * @returns {object} ApplicationExportContractAgent with slightly different field IDs
 */
export const mapExportContractAgentDetails = (agent: ApplicationExportContractAgent) => ({
  id: agent.id,
  ...getTrueAndFalseAnswers(agent),
  [AGENT_NAME]: agent[NAME],
  [AGENT_FULL_ADDRESS]: agent[FULL_ADDRESS],
  [AGENT_COUNTRY_CODE]: agent[COUNTRY_CODE],
});

/**
 * mapPolicyContact
 * Map the policy contact to avoid clashes with other name fields.
 * POLICY_CONTACT_EMAIL - has dot notation to stop clashes with other email fields.
 * @param {ApplicationPolicyContact} policyContact
 * @returns {object} ApplicationPolicyContact with slightly different field IDs
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
 * mapNominatedLossPayee
 * Map the nominated loss payee to avoid clashes with other name and address fields.
 * @param {ApplicationNominatedLossPayee} nominatedLossPayee
 * @returns {object} ApplicationNominatedLossPayee with slightly different field IDs
 */
export const mapNominatedLossPayee = (nominatedLossPayee: ApplicationNominatedLossPayee) => {
  if (nominatedLossPayee[IS_APPOINTED]) {
    const mapped = {
      ...nominatedLossPayee,
      [LOSS_PAYEE_NAME]: nominatedLossPayee[NAME],
      ...nominatedLossPayee.financialUk,
      [LOSS_PAYEE_FINANCIAL_ADDRESS]: nominatedLossPayee.financialUk[FINANCIAL_ADDRESS],
      ...nominatedLossPayee.financialInternational,
      ...getTrueAndFalseAnswers(nominatedLossPayee),
    };

    if (nominatedLossPayee[IS_LOCATED_IN_UK]) {
      mapped[LOSS_PAYEE_FINANCIAL_ADDRESS] = nominatedLossPayee.financialUk[FINANCIAL_ADDRESS];
    }

    if (nominatedLossPayee[IS_LOCATED_INTERNATIONALLY]) {
      mapped[LOSS_PAYEE_FINANCIAL_ADDRESS] = nominatedLossPayee.financialInternational[FINANCIAL_ADDRESS];
    }

    return mapped;
  }

  return {
    [IS_APPOINTED]: nominatedLossPayee[IS_APPOINTED],
  };
};

/**
 * flattenApplicationData
 * Transform an application into a single level object
 * @param {Application} application
 * @returns {ApplicationFlat} Application as a single level object
 */
const flattenApplicationData = (application: Application): ApplicationFlat => {
  try {
    console.info('Flattening application data');

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
      ...exportContract.awardMethod,
      ...getTrueAndFalseAnswers(exportContract),
      ...exportContract.privateMarket,
      ...getTrueAndFalseAnswers(exportContract.privateMarket),
      ...mapExportContractAgentDetails(exportContract.agent),
      ...exportContract.agent.service,
      ...getTrueAndFalseAnswers(exportContract.agent.service),
      ...exportContract.agent.service.charge,
      ...getTrueAndFalseAnswers(declaration),
      ...declaration.modernSlavery,
      ...getTrueAndFalseAnswers(declaration.modernSlavery),
      ...mapNominatedLossPayee(nominatedLossPayee),
      ...relationship,
      ...policy,
      ...policy.jointlyInsuredParty,
      ...mapPolicyContact(policyContact),
      ...getTrueAndFalseAnswers(sectionReview),
    };

    return flattened;
  } catch (error) {
    console.error('Error flattening application data %o', error);

    throw new Error(`Error flattening application data ${error}`);
  }
};

export default flattenApplicationData;
