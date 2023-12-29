import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { radios, field, submitButton } from '../../pages/shared';
import application from '../../fixtures/application';

const {
  POLICY: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      POLICY_CURRENCY_CODE,
      MULTIPLE: { TOTAL_MONTHS_OF_COVER },
    },
  },
} = INSURANCE_FIELD_IDS;

/**
 * completeAndSubmitMultipleContractPolicyForm
 * Complete and submit the "multiple contract policy" form
 */
const completeAndSubmitMultipleContractPolicyForm = () => {
  cy.keyboardInput(field(REQUESTED_START_DATE).dayInput(), application.POLICY[REQUESTED_START_DATE].day);
  cy.keyboardInput(field(REQUESTED_START_DATE).monthInput(), application.POLICY[REQUESTED_START_DATE].month);
  cy.keyboardInput(field(REQUESTED_START_DATE).yearInput(), application.POLICY[REQUESTED_START_DATE].year);

  cy.keyboardInput(field(TOTAL_MONTHS_OF_COVER).input(), application.POLICY[TOTAL_MONTHS_OF_COVER]);

  const isoCode = application.POLICY[POLICY_CURRENCY_CODE];
  radios(POLICY_CURRENCY_CODE, isoCode).option.input().click();

  submitButton().click();
};

export default completeAndSubmitMultipleContractPolicyForm;
