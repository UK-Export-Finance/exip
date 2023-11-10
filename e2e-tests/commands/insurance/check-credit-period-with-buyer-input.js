import insurancePartials from '../../partials/insurance';
import { POLICY_FIELDS as FIELDS } from '../../content-strings/fields/insurance/policy';
import { SHARED_CONTRACT_POLICY } from '../../constants/field-ids/insurance/policy';

const { CREDIT_PERIOD_WITH_BUYER } = SHARED_CONTRACT_POLICY;

/**
 * checkCreditPeriodWithBuyerInput
 * Check "credit period with buyer" label, hint and input.
 */
const checkCreditPeriodWithBuyerInput = () => {
  const fieldId = CREDIT_PERIOD_WITH_BUYER;
  const field = insurancePartials.creditPeriodWithBuyerFormField;

  cy.checkText(field.label(), FIELDS.CONTRACT_POLICY[fieldId].LABEL);

  cy.checkText(field.hint.intro(), FIELDS.CONTRACT_POLICY[fieldId].HINT.INTRO);
  cy.checkText(field.hint.listItem(1), FIELDS.CONTRACT_POLICY[fieldId].HINT.LIST[0]);
  cy.checkText(field.hint.listItem(2), FIELDS.CONTRACT_POLICY[fieldId].HINT.LIST[1]);
  cy.checkText(field.hint.listItem(3), FIELDS.CONTRACT_POLICY[fieldId].HINT.LIST[2]);
  cy.checkText(field.hint.listItem(4), FIELDS.CONTRACT_POLICY[fieldId].HINT.LIST[3]);

  field.input().should('exist');
};

export default checkCreditPeriodWithBuyerInput;
