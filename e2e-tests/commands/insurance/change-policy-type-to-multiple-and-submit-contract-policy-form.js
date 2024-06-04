import { summaryList } from '../../pages/shared';
import { typeOfPolicyPage } from '../../pages/insurance/policy';
import { POLICY as FIELD_IDS } from '../../constants/field-ids/insurance/policy';

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
} = FIELD_IDS;

/**
 * changePolicyTypeToMultipleAndSubmitContractPolicyForm
 * Change policy type to multiple and submit the "multiple contract policy" form.
 */
const changePolicyTypeToMultipleAndSubmitContractPolicyForm = () => {
  summaryList.field(POLICY_TYPE).changeLink().click();

  typeOfPolicyPage[POLICY_TYPE].multiple.label().click();
  cy.clickSubmitButton();

  cy.completeAndSubmitMultipleContractPolicyForm({});
};

export default changePolicyTypeToMultipleAndSubmitContractPolicyForm;
