import getTrueAndFalseAnswers from '../get-true-and-false-answers';
import { Application, ApplicationFlat, ApplicationPolicyContact } from '../../../types';
import INSURANCE_FIELD_IDS from '../../constants/field-ids/insurance';

const {
  POLICY: {
    NAME_ON_POLICY: { IS_SAME_AS_OWNER, POSITION, POLICY_CONTACT_EMAIL },
  },
  ACCOUNT: { FIRST_NAME, LAST_NAME, EMAIL },
} = INSURANCE_FIELD_IDS;

/**
 * policyContactMapped
 * maps policyContact and replaces email with POLICY_CONTACT_EMAIL for task list
 * POLICY_CONTACT_EMAIL - has dot notation to stop clashes with email from broker - allows task list to show completed for policy and for business
 * @param policyContact
 * @returns {Object}
 */
export const policyContactMapped = (policyContact: ApplicationPolicyContact) => ({
  id: policyContact.id,
  [IS_SAME_AS_OWNER]: policyContact[IS_SAME_AS_OWNER],
  [FIRST_NAME]: policyContact[FIRST_NAME],
  [LAST_NAME]: policyContact[LAST_NAME],
  [POLICY_CONTACT_EMAIL]: policyContact[EMAIL],
  [POSITION]: policyContact[POSITION],
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
    ...broker,
    ...buyer,
    ...buyerTradingHistory,
    ...company,
    ...contact,
    ...getTrueAndFalseAnswers(declaration),
    ...exportContract,
    ...nominatedLossPayee,
    ...getTrueAndFalseAnswers(nominatedLossPayee),
    ...relationship,
    ...policy,
    ...policy.jointlyInsuredParty,
    ...policyContactMapped(policyContact),
    ...getTrueAndFalseAnswers(sectionReview),
  };

  return flattened;
};

export default flattenApplicationData;
