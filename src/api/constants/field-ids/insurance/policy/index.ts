import SHARED from '../../shared';

export const SHARED_CONTRACT_POLICY = {
  REQUESTED_START_DATE: 'requestedStartDate',
  POLICY_CURRENCY_CODE: 'policyCurrencyCode',
};

const POLICY = {
  ...SHARED,
  TYPE_OF_POLICY: {
    POLICY_TYPE: SHARED.POLICY_TYPE,
  },
  CONTRACT_POLICY: {
    ...SHARED_CONTRACT_POLICY,
    SINGLE: {
      CONTRACT_COMPLETION_DATE: 'contractCompletionDate',
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
  BROKER: {
    HEADING: 'broker',
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

export default POLICY;
