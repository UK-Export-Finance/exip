import { FIELD_IDS, GROUP_IDS, TASK_IDS, ROUTES } from '../../../constants';
import { SHARED_CONTRACT_POLICY } from '../../../constants/field-ids/insurance/policy-and-exports';
import { mockApplication } from '../../../test-mocks';

describe('server/helpers/check-completed-sections/policy-and-exports', () => {
  const { referenceNumber, policyAndExport } = mockApplication;
  const { policyType } = policyAndExport;

  describe('getContractPolicyTasks', () => {
    describe(`when the policy type is ${FIELD_VALUES.POLICY_TYPE.SINGLE}`, () => {
      it('should return single contract policy specific fields that need to be completed', () => {
        const result = getContractPolicyTasks(FIELD_VALUES.POLICY_TYPE.SINGLE);

        const expected = FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.CONTRACT_POLICY.SINGLE;

        expect(result).toEqual(expected);
      });
    });

    describe(`when the policy type is ${FIELD_VALUES.POLICY_TYPE.MULTIPLE}`, () => {
      it('should return single contract policy specific fields that need to be completed', () => {
        const result = getContractPolicyTasks(FIELD_VALUES.POLICY_TYPE.MULTIPLE);

        const expected = FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.CONTRACT_POLICY.MULTIPLE;

        expect(result).toEqual(expected);
      });
    });

    describe('when there is no policy type', () => {
      it('should return type of policy specific fields that need to be completed', () => {
        const result = getContractPolicyTasks();

        const expected = FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY;

        expect(result).toEqual(expected);
      });
    });
  });
})