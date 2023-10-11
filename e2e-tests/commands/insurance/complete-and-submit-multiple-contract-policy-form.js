import { FIELD_IDS, APPLICATION } from '../../constants';
import { multipleContractPolicyPage } from '../../pages/insurance/policy-and-export';
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
 * - policyAndExportsMaximumValue: should submit an application with the maximum value of 500000
 */
export default ({ policyAndExportsMaximumValue = false }) => {
  cy.keyboardInput(field(REQUESTED_START_DATE).dayInput(), application.POLICY_AND_EXPORTS[REQUESTED_START_DATE].day);
  cy.keyboardInput(field(REQUESTED_START_DATE).monthInput(), application.POLICY_AND_EXPORTS[REQUESTED_START_DATE].month);
  cy.keyboardInput(field(REQUESTED_START_DATE).yearInput(), application.POLICY_AND_EXPORTS[REQUESTED_START_DATE].year);

  field(TOTAL_MONTHS_OF_COVER).input().select(application.POLICY_AND_EXPORTS[TOTAL_MONTHS_OF_COVER]);
  cy.keyboardInput(field(TOTAL_SALES_TO_BUYER).input(), application.POLICY_AND_EXPORTS[TOTAL_SALES_TO_BUYER]);

  if (policyAndExportsMaximumValue) {
    cy.keyboardInput(multipleContractPolicyPage[MAXIMUM_BUYER_WILL_OWE].input(), APPLICATION.POLICY_AND_EXPORT.MAXIMUM_BUYER_CAN_OWE);
  } else {
    cy.keyboardInput(multipleContractPolicyPage[MAXIMUM_BUYER_WILL_OWE].input(), application.POLICY_AND_EXPORTS[MAXIMUM_BUYER_WILL_OWE]);
  }
  cy.keyboardInput(field(CREDIT_PERIOD_WITH_BUYER).input(), application.POLICY_AND_EXPORTS[CREDIT_PERIOD_WITH_BUYER]);

  insurancePartials.policyCurrencyCodeFormField.input().select(application.POLICY_AND_EXPORTS[POLICY_CURRENCY_CODE]);

  submitButton().click();
};
