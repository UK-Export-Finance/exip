import { FIELD_IDS, APPLICATION } from '../../constants';
import { singleContractPolicyPage } from '../../pages/insurance/policy';
import { currencyRadios, field, submitButton } from '../../pages/shared';
import application from '../../fixtures/application';

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        REQUESTED_START_DATE,
        POLICY_CURRENCY_CODE,
        SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
      },
    },
  },
} = FIELD_IDS;

/**
 * completeAndSubmitSingleContractPolicyForm
 * @param {Object} Object with flags completing and submitting single contract policy form
 * - policyMaximumValue: should submit an application with the maximum value of 500000
 */
export default ({ policyMaximumValue = false }) => {
  cy.keyboardInput(field(REQUESTED_START_DATE).dayInput(), application.POLICY[REQUESTED_START_DATE].day);
  cy.keyboardInput(field(REQUESTED_START_DATE).monthInput(), application.POLICY[REQUESTED_START_DATE].month);
  cy.keyboardInput(field(REQUESTED_START_DATE).yearInput(), application.POLICY[REQUESTED_START_DATE].year);

  cy.keyboardInput(field(CONTRACT_COMPLETION_DATE).dayInput(), application.POLICY[CONTRACT_COMPLETION_DATE].day);
  cy.keyboardInput(field(CONTRACT_COMPLETION_DATE).monthInput(), application.POLICY[CONTRACT_COMPLETION_DATE].month);
  cy.keyboardInput(field(CONTRACT_COMPLETION_DATE).yearInput(), application.POLICY[CONTRACT_COMPLETION_DATE].year);

  if (policyMaximumValue) {
    cy.keyboardInput(singleContractPolicyPage[TOTAL_CONTRACT_VALUE].input(), APPLICATION.POLICY.TOTAL_VALUE_OF_CONTRACT.MAXIMUM);
  } else {
    cy.keyboardInput(singleContractPolicyPage[TOTAL_CONTRACT_VALUE].input(), application.POLICY[TOTAL_CONTRACT_VALUE]);
  }

  const isoCode = application.POLICY[POLICY_CURRENCY_CODE];
  currencyRadios(POLICY_CURRENCY_CODE, isoCode).option.input().click();

  submitButton().click();
};
