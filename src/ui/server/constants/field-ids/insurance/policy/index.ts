import SHARED from '../../shared';

const REQUESTED_START_DATE = 'requestedStartDate';
const CONTRACT_COMPLETION_DATE = 'contractCompletionDate';

export const SHARED_CONTRACT_POLICY = {
  REQUESTED_START_DATE,
  REQUESTED_START_DATE_DAY: `${REQUESTED_START_DATE}-day`,
  REQUESTED_START_DATE_MONTH: `${REQUESTED_START_DATE}-month`,
  REQUESTED_START_DATE_YEAR: `${REQUESTED_START_DATE}-year`,
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
      CONTRACT_COMPLETION_DATE,
      CONTRACT_COMPLETION_DATE_DAY: `${CONTRACT_COMPLETION_DATE}-day`,
      CONTRACT_COMPLETION_DATE_MONTH: `${CONTRACT_COMPLETION_DATE}-month`,
      CONTRACT_COMPLETION_DATE_YEAR: `${CONTRACT_COMPLETION_DATE}-year`,
      TOTAL_CONTRACT_VALUE: 'totalValueOfContract',
      REQUESTED_CREDIT_LIMIT: 'requestedCreditLimit',
    },
    MULTIPLE: {
      TOTAL_MONTHS_OF_COVER: 'totalMonthsOfCover',
    },
  },
  EXPORT_VALUE: {
    MULTIPLE: {
      TOTAL_SALES_TO_BUYER: 'totalSalesToBuyer',
      MAXIMUM_BUYER_WILL_OWE: 'maximumBuyerWillOwe',
    },
  },
  NAME_ON_POLICY: {
    NAME: 'nameOnPolicy',
    IS_SAME_AS_OWNER: 'isSameAsOwner',
    SAME_NAME: 'sameName',
    OTHER_NAME: 'otherName',
    POSITION: 'position',
    POLICY_CONTACT_EMAIL: 'policyContact.email',
  },
  DIFFERENT_NAME_ON_POLICY: {
    POLICY_CONTACT_DETAIL: 'policyContactDetail',
    POSITION: 'position',
  },
  NEED_PRE_CREDIT_PERIOD: 'needPreCreditPeriodCover',
  CREDIT_PERIOD_WITH_BUYER: 'creditPeriodWithBuyer',
  REQUESTED_JOINTLY_INSURED_PARTY: {
    REQUESTED: 'requested',
    COMPANY_NAME: 'companyName',
    COMPANY_NUMBER: 'companyNumber',
    COUNTRY_CODE: 'countryCode',
  },
  USING_BROKER: 'isUsingBroker',
  BROKER_DETAILS: {
    NAME: 'name',
    EMAIL: SHARED.EMAIL,
    BROKER_EMAIL: 'broker.email',
    IS_BASED_IN_UK: 'isBasedInUk',
    POSTCODE: 'postcode',
    BUILDING_NUMBER_OR_NAME: 'buildingNumberOrName',
  },
  BROKER_ADDRESSES: {
    SELECT_THE_ADDRESS: 'selectTheAddress',
  },
  BROKER_MANUAL_ADDRESS: {
    FULL_ADDRESS: 'fullAddress',
  },
  LOSS_PAYEE: {
    IS_APPOINTED: 'isAppointed',
  },
  LOSS_PAYEE_DETAILS: {
    NAME: 'name',
    LOSS_PAYEE_NAME: 'lossPayee.name',
    LOCATION: 'location',
    IS_LOCATED_IN_UK: 'isLocatedInUk',
    IS_LOCATED_INTERNATIONALLY: 'isLocatedInternationally',
  },
  LOSS_PAYEE_FINANCIAL_UK: {
    SORT_CODE: 'sortCode',
    ACCOUNT_NUMBER: 'accountNumber',
  },
  LOSS_PAYEE_FINANCIAL_INTERNATIONAL: {
    BIC_SWIFT_CODE: 'bicSwiftCode',
    IBAN: 'iban',
  },
  FINANCIAL_ADDRESS: 'bankAddress',
  LOSS_PAYEE_FINANCIAL_ADDRESS: 'lossPayee.bankAddress',
};

export default POLICY;
