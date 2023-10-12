import getTrueAndFalseAnswers from '../get-true-and-false-answers';
import { Application, ApplicationFlat, ApplicationPolicyContact } from '../../../types';
import INSURANCE_FIELD_IDS from '../../constants/field-ids/insurance';

const {
  POLICY_AND_EXPORTS: {
    NAME_ON_POLICY: { IS_SAME_AS_OWNER, POSITION, POLICY_CONTACT_EMAIL },
  },
  ACCOUNT: { FIRST_NAME, LAST_NAME, EMAIL },
} = INSURANCE_FIELD_IDS;

/**
 * policyContactMapped
 * maps policyContact and replaces email with POLICY_CONTACT_EMAIL for task list
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
  const { policy, exportContract, company, broker, business, buyer, sectionReview, declaration, policyContact } = application;

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
    ...policy,
    ...exportContract,
    ...company,
    ...business,
    ...broker,
    ...buyer,
    ...policyContactMapped(policyContact),
    ...getTrueAndFalseAnswers(sectionReview),
    ...getTrueAndFalseAnswers(declaration),
  };

  return flattened;
};

export default flattenApplicationData;
