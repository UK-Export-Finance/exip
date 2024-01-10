import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { radios, field, submitButton } from '../../pages/shared';
import application from '../../fixtures/application';

const {
  POLICY: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      POLICY_CURRENCY_CODE,
      SINGLE: { CONTRACT_COMPLETION_DATE },
    },
  },
} = INSURANCE_FIELD_IDS;

/**
 * completeAndSubmitSingleContractPolicyForm
 * Complete and submit the "single contract policy" form.
 */
const completeAndSubmitSingleContractPolicyForm = () => {
  cy.keyboardInput(field(REQUESTED_START_DATE).dayInput(), application.POLICY[REQUESTED_START_DATE].day);
  cy.keyboardInput(field(REQUESTED_START_DATE).monthInput(), application.POLICY[REQUESTED_START_DATE].month);
  cy.keyboardInput(field(REQUESTED_START_DATE).yearInput(), application.POLICY[REQUESTED_START_DATE].year);

  cy.keyboardInput(field(CONTRACT_COMPLETION_DATE).dayInput(), application.POLICY[CONTRACT_COMPLETION_DATE].day);
  cy.keyboardInput(field(CONTRACT_COMPLETION_DATE).monthInput(), application.POLICY[CONTRACT_COMPLETION_DATE].month);
  cy.keyboardInput(field(CONTRACT_COMPLETION_DATE).yearInput(), application.POLICY[CONTRACT_COMPLETION_DATE].year);

  const isoCode = application.POLICY[POLICY_CURRENCY_CODE];
  radios(POLICY_CURRENCY_CODE, isoCode).option.input().click();

  submitButton().click();
};

export default completeAndSubmitSingleContractPolicyForm;
