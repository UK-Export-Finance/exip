import { FIELD_IDS } from '../../../constants';
import { multipleContractPolicyPage } from '../../e2e/pages/insurance/policy-and-export';
import insurancePartials from '../../e2e/partials/insurance';
import { submitButton } from '../../e2e/pages/shared';
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

export default () => {
  cy.inputType(multipleContractPolicyPage[REQUESTED_START_DATE].dayInput(), application.POLICY_AND_EXPORTS[REQUESTED_START_DATE].day);
  cy.inputType(multipleContractPolicyPage[REQUESTED_START_DATE].monthInput(), application.POLICY_AND_EXPORTS[REQUESTED_START_DATE].month);
  cy.inputType(multipleContractPolicyPage[REQUESTED_START_DATE].yearInput(), application.POLICY_AND_EXPORTS[REQUESTED_START_DATE].year);

  multipleContractPolicyPage[TOTAL_MONTHS_OF_COVER].input().select(application.POLICY_AND_EXPORTS[TOTAL_MONTHS_OF_COVER]);
  cy.inputType(multipleContractPolicyPage[TOTAL_SALES_TO_BUYER].input(), application.POLICY_AND_EXPORTS[TOTAL_SALES_TO_BUYER]);
  cy.inputType(multipleContractPolicyPage[MAXIMUM_BUYER_WILL_OWE].input(), application.POLICY_AND_EXPORTS[MAXIMUM_BUYER_WILL_OWE]);
  cy.inputType(multipleContractPolicyPage[CREDIT_PERIOD_WITH_BUYER].input(), application.POLICY_AND_EXPORTS[CREDIT_PERIOD_WITH_BUYER]);

  insurancePartials.policyCurrencyCodeFormField.input().select(application.POLICY_AND_EXPORTS[POLICY_CURRENCY_CODE]);

  submitButton().click();
};
