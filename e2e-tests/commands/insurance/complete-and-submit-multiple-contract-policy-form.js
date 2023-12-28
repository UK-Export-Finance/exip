import { APPLICATION } from '../../constants';
import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { multipleContractPolicyPage } from '../../pages/insurance/policy';
import { radios, field, submitButton } from '../../pages/shared';
import application from '../../fixtures/application';

const {
  POLICY: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      POLICY_CURRENCY_CODE,
      MULTIPLE: {
        TOTAL_MONTHS_OF_COVER,
        TOTAL_SALES_TO_BUYER,
        MAXIMUM_BUYER_WILL_OWE,
      },
    },
  },
} = INSURANCE_FIELD_IDS;

/**
 * completeAndSubmitMultipleContractPolicyForm
 * @param {Object} Object with flags completing and submitting multiple contract policy form
 * - policyMaximumValue: should submit an application with the maximum value of 500000
 */
export default ({ policyMaximumValue = false }) => {
  cy.keyboardInput(field(REQUESTED_START_DATE).dayInput(), application.POLICY[REQUESTED_START_DATE].day);
  cy.keyboardInput(field(REQUESTED_START_DATE).monthInput(), application.POLICY[REQUESTED_START_DATE].month);
  cy.keyboardInput(field(REQUESTED_START_DATE).yearInput(), application.POLICY[REQUESTED_START_DATE].year);

  cy.keyboardInput(field(TOTAL_MONTHS_OF_COVER).input(), application.POLICY[TOTAL_MONTHS_OF_COVER]);
  cy.keyboardInput(field(TOTAL_SALES_TO_BUYER).input(), application.POLICY[TOTAL_SALES_TO_BUYER]);

  if (policyMaximumValue) {
    cy.keyboardInput(multipleContractPolicyPage[MAXIMUM_BUYER_WILL_OWE].input(), APPLICATION.POLICY.MAXIMUM_BUYER_CAN_OWE);
  } else {
    cy.keyboardInput(multipleContractPolicyPage[MAXIMUM_BUYER_WILL_OWE].input(), application.POLICY[MAXIMUM_BUYER_WILL_OWE]);
  }

  const isoCode = application.POLICY[POLICY_CURRENCY_CODE];
  radios(POLICY_CURRENCY_CODE, isoCode).option.input().click();

  submitButton().click();
};
