import requiredFields, { getContractPolicyTasks, getBrokerTasks } from '.';
import { FIELD_VALUES } from '../../../constants';
import POLICY_FIELD_IDS, { SHARED_CONTRACT_POLICY } from '../../../constants/field-ids/insurance/policy';
import ACCOUNT_FIELD_IDS from '../../../constants/field-ids/insurance/account';
import { mockApplication } from '../../../test-mocks';

const { POLICY_TYPE } = FIELD_VALUES;

const { REQUESTED_START_DATE, POLICY_CURRENCY_CODE } = SHARED_CONTRACT_POLICY;

const {
  CONTRACT_POLICY,
  TYPE_OF_POLICY,
  NAME_ON_POLICY,
  BROKER: { USING_BROKER, NAME, ADDRESS_LINE_1, TOWN, POSTCODE, EMAIL },
} = POLICY_FIELD_IDS;

const {
  SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
  MULTIPLE,
} = CONTRACT_POLICY;

const { IS_SAME_AS_OWNER, POSITION, POLICY_CONTACT_EMAIL } = NAME_ON_POLICY;

const { FIRST_NAME, LAST_NAME } = ACCOUNT_FIELD_IDS;

describe('server/helpers/required-fields/policy', () => {
  const {
    policy: { policyType },
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

        const expected = MULTIPLE;

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

  describe('getBrokerTasks', () => {
    describe('when isUsingBroker is true', () => {
      it('should return multiple field ids in an array', () => {
        const isUsingBrokerFlag = true;

        const result = getBrokerTasks(isUsingBrokerFlag);

        const expected = [NAME, ADDRESS_LINE_1, TOWN, POSTCODE, EMAIL];

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
      const result = requiredFields({ policyType, isUsingBroker });

      const expected = [
        ...Object.values(TYPE_OF_POLICY),
        REQUESTED_START_DATE,
        POLICY_CURRENCY_CODE,
        ...Object.values(getContractPolicyTasks(policyType)),
        IS_SAME_AS_OWNER,
        FIRST_NAME,
        LAST_NAME,
        POLICY_CONTACT_EMAIL,
        POSITION,
        USING_BROKER,
        ...getBrokerTasks(isUsingBroker),
      ];

      expect(result).toEqual(expected);
    });
  });
});
