import { summaryList } from '../../pages/shared';
import { typeOfPolicyPage } from '../../pages/insurance/policy';
import { POLICY as FIELD_IDS } from '../../constants/field-ids/insurance/policy';

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
} = FIELD_IDS;

/**
 * changePolicyTypeToSingleAndSubmitContractPolicyForm
 * Change policy type to single and submit the "single contract policy" form.
 */
const changePolicyTypeToSingleAndSubmitContractPolicyForm = () => {
  summaryList.field(POLICY_TYPE).changeLink().click();

  typeOfPolicyPage[POLICY_TYPE].single.label().click();
  cy.clickSubmitButton();

  cy.completeAndSubmitSingleContractPolicyForm({});
};

export default changePolicyTypeToSingleAndSubmitContractPolicyForm;
