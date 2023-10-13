import { SHARED } from '../../shared';

export const SHARED_CONTRACT_POLICY = {
  REQUESTED_START_DATE: 'requestedStartDate',
  CREDIT_PERIOD_WITH_BUYER: 'creditPeriodWithBuyer',
  POLICY_CURRENCY_CODE: 'policyCurrencyCode',
};

export const POLICY = {
  ...SHARED,
  TYPE_OF_POLICY: {
    POLICY_TYPE: SHARED.POLICY_TYPE,
  },
  CONTRACT_POLICY: {
    ...SHARED_CONTRACT_POLICY,
    SINGLE: {
      CONTRACT_COMPLETION_DATE: 'contractCompletionDate',
      TOTAL_CONTRACT_VALUE: 'totalValueOfContract',
    },
    MULTIPLE: {
      TOTAL_MONTHS_OF_COVER: 'totalMonthsOfCover',
      TOTAL_SALES_TO_BUYER: 'totalSalesToBuyer',
      MAXIMUM_BUYER_WILL_OWE: 'maximumBuyerWillOwe',
    },
  },
  ABOUT_GOODS_OR_SERVICES: {
    DESCRIPTION: 'goodsOrServicesDescription',
    FINAL_DESTINATION: 'finalDestinationCountryCode',
  },
  NAME_ON_POLICY: {
    NAME: 'nameOnPolicy',
    SAME_NAME: 'sameName',
    OTHER_NAME: 'otherName',
    POSITION: 'position',
  },
  DIFFERENT_NAME_ON_POLICY: {
    POLICY_CONTACT_DETAIL: 'policyContactDetail',
    POSITION: 'position',
  },
};
