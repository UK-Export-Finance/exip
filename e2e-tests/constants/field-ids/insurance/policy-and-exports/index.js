import { SHARED } from '../../shared';

const SHARED_CONTRACT_POLICY = {
  REQUESTED_START_DATE: 'requestedStartDate',
  CREDIT_PERIOD_WITH_BUYER: 'creditPeriodWithBuyer',
  POLICY_CURRENCY_CODE: 'policyCurrencyCode',
};

export const POLICY_AND_EXPORTS = {
  ...SHARED,
  TYPE_OF_POLICY: {
    POLICY_TYPE: SHARED.POLICY_TYPE,
    CURRENCY_CODE: 'currencyCode',
  },
  CONTRACT_POLICY: {
    ...SHARED_CONTRACT_POLICY,
    SINGLE: {
      COMPLETION_OF_CONTRACT_DATE: 'expectedCompletionOfContractDate',
      TOTAL_CONTRACT_VALUE: 'totalValueOfContract',
    },
    MULTI: {},
  },
};
