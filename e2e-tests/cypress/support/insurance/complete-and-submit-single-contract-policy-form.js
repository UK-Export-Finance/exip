import { FIELD_IDS } from '../../../constants';
import { singleContractPolicyPage } from '../../e2e/pages/insurance/policy-and-export';
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
  singleContractPolicyPage[REQUESTED_START_DATE].dayInput().type(application.POLICY_AND_EXPORTS[REQUESTED_START_DATE].day);
  singleContractPolicyPage[REQUESTED_START_DATE].monthInput().type(application.POLICY_AND_EXPORTS[REQUESTED_START_DATE].month);
  singleContractPolicyPage[REQUESTED_START_DATE].yearInput().type(application.POLICY_AND_EXPORTS[REQUESTED_START_DATE].year);

  singleContractPolicyPage[CONTRACT_COMPLETION_DATE].dayInput().type(application.POLICY_AND_EXPORTS[CONTRACT_COMPLETION_DATE].day);
  singleContractPolicyPage[CONTRACT_COMPLETION_DATE].monthInput().type(application.POLICY_AND_EXPORTS[CONTRACT_COMPLETION_DATE].month);
  singleContractPolicyPage[CONTRACT_COMPLETION_DATE].yearInput().type(application.POLICY_AND_EXPORTS[CONTRACT_COMPLETION_DATE].year);

  singleContractPolicyPage[TOTAL_CONTRACT_VALUE].input().type(application.POLICY_AND_EXPORTS[TOTAL_CONTRACT_VALUE]);
  singleContractPolicyPage[CREDIT_PERIOD_WITH_BUYER].input().type(application.POLICY_AND_EXPORTS[CREDIT_PERIOD_WITH_BUYER]);
  singleContractPolicyPage[POLICY_CURRENCY_CODE].input().select(application.POLICY_AND_EXPORTS[POLICY_CURRENCY_CODE]);

  submitButton().click();
};
