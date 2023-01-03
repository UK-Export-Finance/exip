import {
  add,
  getMonth,
  getYear,
} from 'date-fns';
import { FIELD_IDS } from '../../../constants';
import { singleContractPolicyPage } from '../../e2e/pages/insurance/policy-and-export';
import { submitButton } from '../../e2e/pages/shared';

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
  const date = new Date();
  const startDate = add(date, { months: 3 });
  const endDate = add(startDate, { months: 6 });

  singleContractPolicyPage[REQUESTED_START_DATE].dayInput().type('1');
  singleContractPolicyPage[REQUESTED_START_DATE].monthInput().type(getMonth(startDate));
  singleContractPolicyPage[REQUESTED_START_DATE].yearInput().type(getYear(startDate));

  singleContractPolicyPage[CONTRACT_COMPLETION_DATE].dayInput().type('1');
  singleContractPolicyPage[CONTRACT_COMPLETION_DATE].monthInput().type(getMonth(endDate));
  singleContractPolicyPage[CONTRACT_COMPLETION_DATE].yearInput().type(getYear(endDate));

  singleContractPolicyPage[TOTAL_CONTRACT_VALUE].input().type('10000');
  singleContractPolicyPage[CREDIT_PERIOD_WITH_BUYER].input().type('mock free text');
  singleContractPolicyPage[POLICY_CURRENCY_CODE].input().select('GBP');

  submitButton().click();
};
