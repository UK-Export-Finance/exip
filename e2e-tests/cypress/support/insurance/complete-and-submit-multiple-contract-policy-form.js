import {
  add,
  getMonth,
  getYear,
} from 'date-fns';
import { FIELD_IDS } from '../../../constants';
import { multipleContractPolicyPage } from '../../e2e/pages/insurance/policy-and-export';
import { submitButton } from '../../e2e/pages/shared';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        REQUESTED_START_DATE,
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
  const date = new Date();
  const startDate = add(date, { months: 3 });

  multipleContractPolicyPage[REQUESTED_START_DATE].dayInput().type('1');
  multipleContractPolicyPage[REQUESTED_START_DATE].monthInput().type(getMonth(startDate));
  multipleContractPolicyPage[REQUESTED_START_DATE].yearInput().type(getYear(startDate));

  multipleContractPolicyPage[TOTAL_MONTHS_OF_COVER].input().select('2');
  multipleContractPolicyPage[TOTAL_SALES_TO_BUYER].input().type('1000');
  multipleContractPolicyPage[MAXIMUM_BUYER_WILL_OWE].input().type('500');

  submitButton().click();
};
