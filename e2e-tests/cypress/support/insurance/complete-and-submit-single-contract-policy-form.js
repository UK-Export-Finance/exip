import { FIELD_IDS } from '../../../constants';
import { singleContractPolicyPage } from '../../e2e/pages/insurance/policy-and-export';
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
        SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
      },
    },
  },
} = FIELD_IDS;

export default () => {
  cy.inputType(singleContractPolicyPage[REQUESTED_START_DATE].dayInput(), application.POLICY_AND_EXPORTS[REQUESTED_START_DATE].day);
  cy.inputType(singleContractPolicyPage[REQUESTED_START_DATE].monthInput(), application.POLICY_AND_EXPORTS[REQUESTED_START_DATE].month);
  cy.inputType(singleContractPolicyPage[REQUESTED_START_DATE].yearInput(), application.POLICY_AND_EXPORTS[REQUESTED_START_DATE].year);

  cy.inputType(singleContractPolicyPage[CONTRACT_COMPLETION_DATE].dayInput(), application.POLICY_AND_EXPORTS[CONTRACT_COMPLETION_DATE].day);
  cy.inputType(singleContractPolicyPage[CONTRACT_COMPLETION_DATE].monthInput(), application.POLICY_AND_EXPORTS[CONTRACT_COMPLETION_DATE].month);
  cy.inputType(singleContractPolicyPage[CONTRACT_COMPLETION_DATE].yearInput(), application.POLICY_AND_EXPORTS[CONTRACT_COMPLETION_DATE].year);

  cy.inputType(singleContractPolicyPage[TOTAL_CONTRACT_VALUE].input(), application.POLICY_AND_EXPORTS[TOTAL_CONTRACT_VALUE]);
  cy.inputType(singleContractPolicyPage[CREDIT_PERIOD_WITH_BUYER].input(), application.POLICY_AND_EXPORTS[CREDIT_PERIOD_WITH_BUYER]);
  insurancePartials.policyCurrencyCodeFormField.input().select(application.POLICY_AND_EXPORTS[POLICY_CURRENCY_CODE]);

  submitButton().click();
};
