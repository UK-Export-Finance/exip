import SHARED from '../../shared';

const REQUESTED_START_DATE = 'requestedStartDate';
const CONTRACT_COMPLETION_DATE = 'contractCompletionDate';

export const SHARED_CONTRACT_POLICY = {
  REQUESTED_START_DATE,
  REQUESTED_START_DATE_DAY: `${REQUESTED_START_DATE}-day`,
  REQUESTED_START_DATE_MONTH: `${REQUESTED_START_DATE}-month`,
  REQUESTED_START_DATE_YEAR: `${REQUESTED_START_DATE}-year`,
  POLICY_CURRENCY_CODE: 'policyCurrencyCode',
  ALTERNATIVE_POLICY_CURRENCY_CODE: 'alternativePolicyCurrencyCode',
};

export const POLICY = {
  ...SHARED,
  TYPE_OF_POLICY: {
    POLICY_TYPE: SHARED.POLICY_TYPE,
  },
  CONTRACT_POLICY: {
    ...SHARED_CONTRACT_POLICY,
    SINGLE: {
      CONTRACT_COMPLETION_DATE,
      CONTRACT_COMPLETION_DATE_DAY: `${CONTRACT_COMPLETION_DATE}-day`,
      CONTRACT_COMPLETION_DATE_MONTH: `${CONTRACT_COMPLETION_DATE}-month`,
      CONTRACT_COMPLETION_DATE_YEAR: `${CONTRACT_COMPLETION_DATE}-year`,
    },
    MULTIPLE: {
      TOTAL_MONTHS_OF_COVER: 'totalMonthsOfCover',
    },
  },
  EXPORT_VALUE: {
    SINGLE: {
      TOTAL_CONTRACT_VALUE: 'totalValueOfContract',
    },
    MULTIPLE: {
      TOTAL_SALES_TO_BUYER: 'totalSalesToBuyer',
      MAXIMUM_BUYER_WILL_OWE: 'maximumBuyerWillOwe',
    },
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
  BROKER: {
    LEGEND: 'broker',
    USING_BROKER: 'isUsingBroker',
    NAME: 'name',
    ADDRESS_LINE_1: 'addressLine1',
    ADDRESS_LINE_2: 'addressLine2',
    TOWN: 'town',
    COUNTY: 'county',
    POSTCODE: 'postcode',
    EMAIL: 'email',
    DETAILS: 'whyAppointBroker',
  },
};
