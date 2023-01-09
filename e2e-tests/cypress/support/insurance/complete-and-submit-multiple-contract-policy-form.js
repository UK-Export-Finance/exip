import { FIELD_IDS } from '../../../constants';
import { multipleContractPolicyPage } from '../../e2e/pages/insurance/policy-and-export';
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
  multipleContractPolicyPage[REQUESTED_START_DATE].dayInput().type(application.POLICY_AND_EXPORTS[REQUESTED_START_DATE].day);
  multipleContractPolicyPage[REQUESTED_START_DATE].monthInput().type(application.POLICY_AND_EXPORTS[REQUESTED_START_DATE].month);
  multipleContractPolicyPage[REQUESTED_START_DATE].yearInput().type(application.POLICY_AND_EXPORTS[REQUESTED_START_DATE].year);

  multipleContractPolicyPage[TOTAL_MONTHS_OF_COVER].input().select(application.POLICY_AND_EXPORTS[TOTAL_MONTHS_OF_COVER]);
  multipleContractPolicyPage[TOTAL_SALES_TO_BUYER].input().type(application.POLICY_AND_EXPORTS[TOTAL_SALES_TO_BUYER]);
  multipleContractPolicyPage[MAXIMUM_BUYER_WILL_OWE].input().type(application.POLICY_AND_EXPORTS[MAXIMUM_BUYER_WILL_OWE]);
  multipleContractPolicyPage[CREDIT_PERIOD_WITH_BUYER].input().type(application.POLICY_AND_EXPORTS[CREDIT_PERIOD_WITH_BUYER]);

  multipleContractPolicyPage[POLICY_CURRENCY_CODE].input().select(application.POLICY_AND_EXPORTS[POLICY_CURRENCY_CODE]);

  submitButton().click();
};
