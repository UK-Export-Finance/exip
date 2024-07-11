import { FIELD_IDS, FIELD_VALUES } from '../../constants';
import { typeOfPolicyPage } from '../../pages/insurance/policy';

const {
  INSURANCE: {
    POLICY: { POLICY_TYPE },
  },
} = FIELD_IDS;

const {
  POLICY_TYPE: { SINGLE, MULTIPLE },
} = FIELD_VALUES;

/**
 * completeAndSubmitPolicyTypeForm
 * Complete and submit the "policy type" form.
 * @param {String} policyType: Single or multiple. Defaults to single.
 */
const completeAndSubmitPolicyTypeForm = ({ policyType = SINGLE }) => {
  const fieldId = POLICY_TYPE;

  if (policyType === SINGLE) {
    typeOfPolicyPage[fieldId].single.label().click();
  } else if (policyType === MULTIPLE) {
    typeOfPolicyPage[fieldId].multiple.label().click();
  }

  cy.clickSubmitButton();
};

export default completeAndSubmitPolicyTypeForm;
