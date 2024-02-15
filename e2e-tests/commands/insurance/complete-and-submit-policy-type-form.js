import { FIELD_IDS, FIELD_VALUES } from '../../constants';
import { typeOfPolicyPage } from '../../pages/insurance/policy';

const {
  INSURANCE: {
    POLICY: { POLICY_TYPE },
  },
} = FIELD_IDS;

export default (policyType) => {
  const fieldId = POLICY_TYPE;

  if (policyType === FIELD_VALUES.POLICY_TYPE.SINGLE) {
    typeOfPolicyPage[fieldId].single.label().click();
  } else if (policyType === FIELD_VALUES.POLICY_TYPE.MULTIPLE) {
    typeOfPolicyPage[fieldId].multiple.label().click();
  }

  cy.clickSubmitButton();
};
