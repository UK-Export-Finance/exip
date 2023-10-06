import { FIELD_IDS, APPLICATION } from '../../constants';
import { singleContractPolicyPage } from '../../pages/insurance/policy-and-export';
import insurancePartials from '../../partials/insurance';
import { field, submitButton } from '../../pages/shared';
import application from '../../fixtures/application';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        REQUESTED_START_DATE,
        CREDIT_PERIOD_WITH_BUYER,
        POLICY_CURRENCY_CODE,
        SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
      },
    },
  },
} = FIELD_IDS;

/**
 * completeAndSubmitSingleContractPolicyForm
 * @param {Object} Object with flags completing and submitting single contract policy form
 * - policyAndExportsMaximumValue: should submit an application with the maximum value of 500000
 */
export default ({ policyAndExportsMaximumValue = false }) => {
  cy.keyboardInput(field(REQUESTED_START_DATE).dayInput(), application.POLICY_AND_EXPORTS[REQUESTED_START_DATE].day);
  cy.keyboardInput(field(REQUESTED_START_DATE).monthInput(), application.POLICY_AND_EXPORTS[REQUESTED_START_DATE].month);
  cy.keyboardInput(field(REQUESTED_START_DATE).yearInput(), application.POLICY_AND_EXPORTS[REQUESTED_START_DATE].year);

  cy.keyboardInput(field(CONTRACT_COMPLETION_DATE).dayInput(), application.POLICY_AND_EXPORTS[CONTRACT_COMPLETION_DATE].day);
  cy.keyboardInput(field(CONTRACT_COMPLETION_DATE).monthInput(), application.POLICY_AND_EXPORTS[CONTRACT_COMPLETION_DATE].month);
  cy.keyboardInput(field(CONTRACT_COMPLETION_DATE).yearInput(), application.POLICY_AND_EXPORTS[CONTRACT_COMPLETION_DATE].year);

  if (policyAndExportsMaximumValue) {
    cy.keyboardInput(singleContractPolicyPage[TOTAL_CONTRACT_VALUE].input(), APPLICATION.POLICY_AND_EXPORT.TOTAL_VALUE_OF_CONTRACT.MAXIMUM);
  } else {
    cy.keyboardInput(singleContractPolicyPage[TOTAL_CONTRACT_VALUE].input(), application.POLICY_AND_EXPORTS[TOTAL_CONTRACT_VALUE]);
  }

  cy.keyboardInput(field(CREDIT_PERIOD_WITH_BUYER).input(), application.POLICY_AND_EXPORTS[CREDIT_PERIOD_WITH_BUYER]);
  insurancePartials.policyCurrencyCodeFormField.input().select(application.POLICY_AND_EXPORTS[POLICY_CURRENCY_CODE]);

  submitButton().click();
};
