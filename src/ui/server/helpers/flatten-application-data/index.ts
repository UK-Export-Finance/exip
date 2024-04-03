import getTrueAndFalseAnswers from '../get-true-and-false-answers';
import INSURANCE_FIELD_IDS from '../../constants/field-ids/insurance';
import { Application, ApplicationBroker, ApplicationFlat, ApplicationPolicyContact } from '../../../types';

const {
  POLICY: {
    NAME_ON_POLICY: { IS_SAME_AS_OWNER, POSITION, POLICY_CONTACT_EMAIL },
    USING_BROKER,
    BROKER_DETAILS: { NAME, BROKER_EMAIL, FULL_ADDRESS },
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
 * maps broker and replaces email with BROKER_EMAIL for task list
 * BROKER_EMAIL - has dot notation to stop clashes with other email fields.
 * @param {ApplicationBroker} broker
 * @returns {Object}
 */
export const mapBroker = (broker: ApplicationBroker) => ({
  id: broker.id,
  [USING_BROKER]: broker[USING_BROKER],
  [NAME]: broker[NAME],
  [BROKER_EMAIL]: broker[EMAIL],
  [FULL_ADDRESS]: broker[FULL_ADDRESS],
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
    ...exportContract.privateMarket,
    ...getTrueAndFalseAnswers(exportContract.privateMarket),
    ...getTrueAndFalseAnswers(declaration),
    // TODO: ticket number to be confirmed
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
