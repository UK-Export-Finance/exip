import {
  add,
  getDate,
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
        SINGLE: { TOTAL_CONTRACT_VALUE },
      },
    },
  },
} = FIELD_IDS;

export default () => {
  const date = new Date();
  const futureDate = add(date, { days: 1, months: 3 });

  singleContractPolicyPage[REQUESTED_START_DATE].dayInput().type(getDate(futureDate));
  singleContractPolicyPage[REQUESTED_START_DATE].monthInput().type(getMonth(futureDate));
  singleContractPolicyPage[REQUESTED_START_DATE].yearInput().type(getYear(futureDate));

  singleContractPolicyPage[TOTAL_CONTRACT_VALUE].input().type('10000');
  singleContractPolicyPage[CREDIT_PERIOD_WITH_BUYER].input().type('mock free text');

  submitButton().click();
};
