import { FIELD_IDS, FIELD_VALUES } from '../../../constants';
import { typeOfPolicyPage } from '../../e2e/pages/insurance/policy-and-export';
import { submitButton } from '../../e2e/pages/shared';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: { POLICY_TYPE },
  },
} = FIELD_IDS;

export default (policyType) => {
  const fieldId = POLICY_TYPE;

  if (policyType === FIELD_VALUES.POLICY_TYPE.SINGLE) {
    typeOfPolicyPage[fieldId].single.input().click();
  } else if (policyType === FIELD_VALUES.POLICY_TYPE.MULTIPLE) {
    typeOfPolicyPage[fieldId].multiple.input().click();
  }

  submitButton().click();
};
