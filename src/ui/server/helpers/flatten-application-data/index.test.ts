import flattenApplicationData, { mapPolicyContact, mapBroker } from '.';
import INSURANCE_FIELD_IDS from '../../constants/field-ids/insurance';
import getTrueAndFalseAnswers from '../get-true-and-false-answers';
import { mockApplication } from '../../test-mocks';

const {
  POLICY: {
    NAME_ON_POLICY: { IS_SAME_AS_OWNER, POSITION, POLICY_CONTACT_EMAIL },
    USING_BROKER,
    BROKER_DETAILS: { NAME, BROKER_EMAIL, FULL_ADDRESS },
  },
  ACCOUNT: { FIRST_NAME, LAST_NAME, EMAIL },
} = INSURANCE_FIELD_IDS;

const { broker, business, buyer, company, declaration, exportContract, nominatedLossPayee, policy, policyContact, sectionReview } = mockApplication;
const { buyerTradingHistory, contact, relationship } = mockApplication.buyer;

describe('server/helpers/flatten-application-data', () => {
  describe('mapPolicyContact', () => {
    it('should return mapped policy contact fields', () => {
      const result = mapPolicyContact(policyContact);

      const expected = {
        id: policyContact.id,
        [IS_SAME_AS_OWNER]: policyContact[IS_SAME_AS_OWNER],
        [FIRST_NAME]: policyContact[FIRST_NAME],
        [LAST_NAME]: policyContact[LAST_NAME],
        [POLICY_CONTACT_EMAIL]: policyContact[EMAIL],
        [POSITION]: policyContact[POSITION],
      };

      expect(result).toEqual(expected);
    });
  });

  describe('mapBroker', () => {
    it('should return mapped broker fields', () => {
      const result = mapBroker(broker);

      const expected = {
        id: broker.id,
        [USING_BROKER]: broker[USING_BROKER],
        [NAME]: broker[NAME],
        [BROKER_EMAIL]: broker[EMAIL],
        [FULL_ADDRESS]: broker[FULL_ADDRESS],
      };

      expect(result).toEqual(expected);
    });
  });

  describe('flattenApplicationData', () => {
    it('should return an application with a flat structure with no nested objects', () => {
      const result = flattenApplicationData(mockApplication);

      const expected = {
        ...mockApplication.eligibility,
        version: mockApplication.version,
        referenceNumber: mockApplication.referenceNumber,
        createdAt: mockApplication.createdAt,
        updatedAt: mockApplication.updatedAt,
        dealType: mockApplication.dealType,
        submissionCount: mockApplication.submissionCount,
        submissionDeadline: mockApplication.submissionDeadline,
        submissionType: mockApplication.submissionType,
        submissionDate: mockApplication.submissionDate,
        status: mockApplication.status,
        buyerCountry: mockApplication.eligibility.buyerCountry.isoCode,
        ...business,
        ...mapBroker(broker),
        ...buyer,
        ...buyerTradingHistory,
        ...company,
        ...contact,
        ...getTrueAndFalseAnswers(declaration),
        ...exportContract,
        ...exportContract.privateMarket,
        ...nominatedLossPayee,
        ...getTrueAndFalseAnswers(nominatedLossPayee),
        ...relationship,
        ...policy,
        ...policy.jointlyInsuredParty,
        ...mapPolicyContact(policyContact),
        ...getTrueAndFalseAnswers(sectionReview),
      };

      expect(result).toEqual(expected);
    });
  });
});
