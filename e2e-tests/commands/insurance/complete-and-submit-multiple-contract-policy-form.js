import { FIELD_IDS, APPLICATION } from '../../constants';
import { multipleContractPolicyPage } from '../../pages/insurance/policy';
import insurancePartials from '../../partials/insurance';
import { field, submitButton } from '../../pages/shared';
import application from '../../fixtures/application';

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        REQUESTED_START_DATE,
        CREDIT_PERIOD_WITH_BUYER,
        POLICY_CURRENCY_CODE,
        MULTIPLE: {
          TOTAL_MONTHS_OF_COVER,
          TOTAL_SALES_TO_BUYER,
          MAXIMUM_BUYER_WILL_OWE,
        },
      },
    },
  },
} = FIELD_IDS;

/**
 * completeAndSubmitMultipleContractPolicyForm
 * @param {Object} Object with flags completing and submitting multiple contract policy form
 * - policyMaximumValue: should submit an application with the maximum value of 500000
 */
export default ({ policyMaximumValue = false }) => {
  cy.keyboardInput(field(REQUESTED_START_DATE).dayInput(), application.POLICY[REQUESTED_START_DATE].day);
  cy.keyboardInput(field(REQUESTED_START_DATE).monthInput(), application.POLICY[REQUESTED_START_DATE].month);
  cy.keyboardInput(field(REQUESTED_START_DATE).yearInput(), application.POLICY[REQUESTED_START_DATE].year);

  field(TOTAL_MONTHS_OF_COVER).input().select(application.POLICY[TOTAL_MONTHS_OF_COVER]);
  cy.keyboardInput(field(TOTAL_SALES_TO_BUYER).input(), application.POLICY[TOTAL_SALES_TO_BUYER]);

  if (policyMaximumValue) {
    cy.keyboardInput(multipleContractPolicyPage[MAXIMUM_BUYER_WILL_OWE].input(), APPLICATION.POLICY.MAXIMUM_BUYER_CAN_OWE);
  } else {
    cy.keyboardInput(multipleContractPolicyPage[MAXIMUM_BUYER_WILL_OWE].input(), application.POLICY[MAXIMUM_BUYER_WILL_OWE]);
  }
  cy.keyboardInput(field(CREDIT_PERIOD_WITH_BUYER).input(), application.POLICY[CREDIT_PERIOD_WITH_BUYER]);

  insurancePartials.policyCurrencyCodeFormField.input().select(application.POLICY[POLICY_CURRENCY_CODE]);

  submitButton().click();
};
