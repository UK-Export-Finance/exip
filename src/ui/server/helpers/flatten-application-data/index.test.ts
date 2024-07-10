import flattenApplicationData, { mapBroker, mapExportContractAgentDetails, mapPolicyContact, mapNominatedLossPayee } from '.';
import INSURANCE_FIELD_IDS from '../../constants/field-ids/insurance';
import getTrueAndFalseAnswers from '../get-true-and-false-answers';
import { mockApplication, referenceNumber } from '../../test-mocks';

const {
  POLICY: {
    NAME_ON_POLICY: { IS_SAME_AS_OWNER, POSITION, POLICY_CONTACT_EMAIL },
    USING_BROKER,
    BROKER_DETAILS: { NAME, BROKER_EMAIL, FULL_ADDRESS },
    FINANCIAL_ADDRESS,
    LOSS_PAYEE: { IS_APPOINTED },
    LOSS_PAYEE_DETAILS: { LOSS_PAYEE_NAME, IS_LOCATED_INTERNATIONALLY, IS_LOCATED_IN_UK },
    LOSS_PAYEE_FINANCIAL_ADDRESS,
  },
  EXPORT_CONTRACT: {
    AGENT_DETAILS: { AGENT_NAME, AGENT_FULL_ADDRESS, AGENT_COUNTRY_CODE, COUNTRY_CODE },
  },
  ACCOUNT: { FIRST_NAME, LAST_NAME, EMAIL },
} = INSURANCE_FIELD_IDS;

const { broker, business, buyer, company, declaration, exportContract } = mockApplication;
const { nominatedLossPayee, policy, policyContact, sectionReview } = mockApplication;

const { buyerTradingHistory, contact, relationship } = mockApplication.buyer;

describe('server/helpers/flatten-application-data', () => {
  describe('mapBroker', () => {
    it('should return mapped broker IDs', () => {
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

  describe('mapExportContractAgentDetails', () => {
    it('should return mapped export contract agent IDs', () => {
      const result = mapExportContractAgentDetails(exportContract.agent);

      const expected = {
        id: exportContract.agent.id,
        ...getTrueAndFalseAnswers(exportContract.agent),
        [AGENT_NAME]: exportContract.agent[NAME],
        [AGENT_FULL_ADDRESS]: exportContract.agent[FULL_ADDRESS],
        [AGENT_COUNTRY_CODE]: exportContract.agent[COUNTRY_CODE],
      };

      expect(result).toEqual(expected);
    });
  });

  describe('mapPolicyContact', () => {
    it('should return mapped policy contact IDs', () => {
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

  describe('mapNominatedLossPayee', () => {
    const expectedGenericIds = {
      ...nominatedLossPayee,
      [IS_APPOINTED]: true,
      [LOSS_PAYEE_NAME]: nominatedLossPayee[NAME],
      ...nominatedLossPayee.financialUk,
      [LOSS_PAYEE_FINANCIAL_ADDRESS]: nominatedLossPayee.financialUk[FINANCIAL_ADDRESS],
      ...nominatedLossPayee.financialInternational,
      ...getTrueAndFalseAnswers(nominatedLossPayee),
    };

    describe(`when ${IS_APPOINTED} is true`, () => {
      it('should return mapped loss payee IDs', () => {
        const nominatedLossPayeeAppointedTrue = {
          ...nominatedLossPayee,
          [IS_APPOINTED]: true,
        };

        const result = mapNominatedLossPayee(nominatedLossPayeeAppointedTrue);

        const expected = {
          ...expectedGenericIds,
          [IS_APPOINTED]: true,
          [LOSS_PAYEE_FINANCIAL_ADDRESS]: nominatedLossPayee.financialUk[FINANCIAL_ADDRESS],
        };

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${IS_LOCATED_INTERNATIONALLY} is true`, () => {
      it('should return mapped loss payee contact IDs', () => {
        const result = mapNominatedLossPayee({
          ...nominatedLossPayee,
          [IS_APPOINTED]: true,
          [IS_LOCATED_IN_UK]: false,
          [IS_LOCATED_INTERNATIONALLY]: true,
        });

        const expected = {
          ...expectedGenericIds,
          [IS_APPOINTED]: true,
          [IS_LOCATED_INTERNATIONALLY]: true,
          [LOSS_PAYEE_FINANCIAL_ADDRESS]: nominatedLossPayee.financialInternational[FINANCIAL_ADDRESS],
        };

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${IS_APPOINTED} is false`, () => {
      it(`should return an object with only ${IS_APPOINTED}`, () => {
        const result = mapNominatedLossPayee({
          ...nominatedLossPayee,
          [IS_APPOINTED]: false,
        });

        const expected = { [IS_APPOINTED]: false };

        expect(result).toEqual(expected);
      });
    });
  });

  describe('flattenApplicationData', () => {
    it('should return an application with a flat structure with no nested objects', () => {
      const result = flattenApplicationData(mockApplication);

      const expected = {
        ...mockApplication.eligibility,
        version: mockApplication.version,
        referenceNumber,
        createdAt: mockApplication.createdAt,
        updatedAt: mockApplication.updatedAt,
        dealType: mockApplication.dealType,
        migratedV1toV2: mockApplication.migratedV1toV2,
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
        ...getTrueAndFalseAnswers(exportContract),
        ...exportContract.privateMarket,
        ...getTrueAndFalseAnswers(exportContract.privateMarket),
        ...mapExportContractAgentDetails(exportContract.agent),
        ...exportContract.agent.service,
        ...getTrueAndFalseAnswers(exportContract.agent.service),
        ...exportContract.agent.service.charge,
        ...mapNominatedLossPayee(nominatedLossPayee),
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
