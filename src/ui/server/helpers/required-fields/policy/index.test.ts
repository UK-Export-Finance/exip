import requiredFields, { getContractPolicyTasks, getJointlyInsuredPartyTasks, getBrokerTasks } from '.';
import { FIELD_VALUES } from '../../../constants';
import POLICY_FIELD_IDS, { SHARED_CONTRACT_POLICY } from '../../../constants/field-ids/insurance/policy';
import ACCOUNT_FIELD_IDS from '../../../constants/field-ids/insurance/account';
import { mockApplication } from '../../../test-mocks';

const { POLICY_TYPE } = FIELD_VALUES;

const { REQUESTED_START_DATE, POLICY_CURRENCY_CODE } = SHARED_CONTRACT_POLICY;

const {
  CONTRACT_POLICY: {
    SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
    MULTIPLE: { TOTAL_MONTHS_OF_COVER },
  },
  EXPORT_VALUE: {
    MULTIPLE: { TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
  },
  TYPE_OF_POLICY,
  NAME_ON_POLICY,
  REQUESTED_JOINTLY_INSURED_PARTY: { REQUESTED, COMPANY_NAME, COUNTRY_CODE },
  USING_BROKER,
  BROKER_DETAILS: { NAME, BROKER_EMAIL, FULL_ADDRESS },
  LOSS_PAYEE,
} = POLICY_FIELD_IDS;

const { IS_SAME_AS_OWNER, POSITION, POLICY_CONTACT_EMAIL } = NAME_ON_POLICY;

const { FIRST_NAME, LAST_NAME } = ACCOUNT_FIELD_IDS;

describe('server/helpers/required-fields/policy', () => {
  const {
    policy: { policyType, jointlyInsuredParty },
    broker: { isUsingBroker },
  } = mockApplication;

  describe('getContractPolicyTasks', () => {
    describe(`when the policy type is ${POLICY_TYPE.SINGLE}`, () => {
      it('should return single contract policy specific fields that need to be completed', () => {
        const result = getContractPolicyTasks(POLICY_TYPE.SINGLE);

        const expected = {
          CONTRACT_COMPLETION_DATE,
          TOTAL_CONTRACT_VALUE,
        };

        expect(result).toEqual(expected);
      });
    });

    describe(`when the policy type is ${POLICY_TYPE.MULTIPLE}`, () => {
      it('should return single contract policy specific fields that need to be completed', () => {
        const result = getContractPolicyTasks(POLICY_TYPE.MULTIPLE);

        const expected = {
          TOTAL_MONTHS_OF_COVER,
          TOTAL_SALES_TO_BUYER,
          MAXIMUM_BUYER_WILL_OWE,
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when there is no policy type', () => {
      it('should return type of policy specific fields that need to be completed', () => {
        const result = getContractPolicyTasks();

        const expected = TYPE_OF_POLICY;

        expect(result).toEqual(expected);
      });
    });
  });

  describe('getJointlyInsuredPartyTasks', () => {
    describe('when jointlyInsuredParty is true', () => {
      it('should return multiple field ids in an array', () => {
        const jointlyInsuredPartyFlag = true;

        const result = getJointlyInsuredPartyTasks(jointlyInsuredPartyFlag);

        const expected = [COMPANY_NAME, COUNTRY_CODE];

        expect(result).toEqual(expected);
      });
    });

    describe('when jointlyInsuredParty is undefined', () => {
      it(`should return an array with ${REQUESTED} field`, () => {
        const result = getJointlyInsuredPartyTasks();

        const expected = [REQUESTED];

        expect(result).toEqual(expected);
      });
    });

    describe('when jointlyInsuredParty is false', () => {
      it(`should return an array with ${REQUESTED} field`, () => {
        const jointlyInsuredPartyFlag = false;

        const result = getJointlyInsuredPartyTasks(jointlyInsuredPartyFlag);

        const expected = [REQUESTED];

        expect(result).toEqual(expected);
      });
    });
  });

  describe('getBrokerTasks', () => {
    describe('when isUsingBroker is true', () => {
      it('should return multiple field ids in an array', () => {
        const isUsingBrokerFlag = true;

        const result = getBrokerTasks(isUsingBrokerFlag);

        const expected = [NAME, BROKER_EMAIL, FULL_ADDRESS];

        expect(result).toEqual(expected);
      });
    });

    describe('when isUsingBroker is undefined', () => {
      it('should return an empty array', () => {
        const result = getBrokerTasks();

        expect(result).toEqual([]);
      });
    });

    describe('when isUsingBroker is false', () => {
      it('should return an empty array', () => {
        const isUsingBrokerFlag = false;

        const result = getBrokerTasks(isUsingBrokerFlag);

        expect(result).toEqual([]);
      });
    });
  });

  describe('requiredFields', () => {
    it('should return array of required fields', () => {
      const result = requiredFields({
        policyType,
        jointlyInsuredParty: jointlyInsuredParty[REQUESTED],
        isUsingBroker,
      });

      const expected = [
        ...Object.values(TYPE_OF_POLICY),
        REQUESTED_START_DATE,
        POLICY_CURRENCY_CODE,
        ...Object.values(getContractPolicyTasks(policyType)),
        ...Object.values(getJointlyInsuredPartyTasks(jointlyInsuredParty[REQUESTED])),
        IS_SAME_AS_OWNER,
        FIRST_NAME,
        LAST_NAME,
        POLICY_CONTACT_EMAIL,
        POSITION,
        USING_BROKER,
        ...getBrokerTasks(isUsingBroker),
        LOSS_PAYEE.IS_APPOINTED,
      ];

      expect(result).toEqual(expected);
    });
  });
});
