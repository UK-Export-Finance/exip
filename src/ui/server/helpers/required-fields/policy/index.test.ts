import requiredFields, { getContractPolicyTasks } from '.';
import { FIELD_VALUES } from '../../../constants';
import POLICY_FIELD_IDS, { SHARED_CONTRACT_POLICY } from '../../../constants/field-ids/insurance/policy';
import ACCOUNT_FIELD_IDS from '../../../constants/field-ids/insurance/account';
import { mockApplication } from '../../../test-mocks';

const { POLICY_TYPE } = FIELD_VALUES;

const { REQUESTED_START_DATE, POLICY_CURRENCY_CODE } = SHARED_CONTRACT_POLICY;

const { CONTRACT_POLICY, TYPE_OF_POLICY, ABOUT_GOODS_OR_SERVICES, NAME_ON_POLICY } = POLICY_FIELD_IDS;

const {
  SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
  MULTIPLE,
} = CONTRACT_POLICY;

const { IS_SAME_AS_OWNER, POSITION, POLICY_CONTACT_EMAIL } = NAME_ON_POLICY;

const { FIRST_NAME, LAST_NAME } = ACCOUNT_FIELD_IDS;

describe('server/helpers/required-fields/policy', () => {
  const { policy } = mockApplication;
  const { policyType } = policy;

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

  describe('requiredFields', () => {
    it('should return array of required fields', () => {
      const result = requiredFields(policyType);

      const expected = Object.values({
        ...TYPE_OF_POLICY,
        REQUESTED_START_DATE,
        POLICY_CURRENCY_CODE,
        ...getContractPolicyTasks(policyType),
        ...ABOUT_GOODS_OR_SERVICES,
        IS_SAME_AS_OWNER,
        FIRST_NAME,
        LAST_NAME,
        POLICY_CONTACT_EMAIL,
        POSITION,
      });

      expect(result).toEqual(expected);
    });
  });
});
