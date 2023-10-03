import LATEST_VERSION_NUMBER from './versions/latest';

export const INSURANCE = 'Insurance';

export const APPLICATION = {
  LATEST_VERSION: { LATEST_VERSION_NUMBER },
  DEAL_TYPE: 'EXIP',
  SUBMISSION_COUNT_DEFAULT: 0,
  SUBMISSION_DEADLINE_IN_MONTHS: 1,
  SUBMISSION_TYPE: {
    MIA: 'Manual Inclusion Application',
  },
  STATUS: {
    IN_PROGRESS: 'In progress',
    SUBMITTED: 'Submitted to UKEF',
  },
  POLICY_TYPE: {
    SINGLE: 'Single contract policy',
    MULTIPLE: 'Multiple contract policy',
  },
  POLICY_AND_EXPORT: {
    TOTAL_VALUE_OF_CONTRACT: {
      MINIMUM: 1,
      MAXIMUM: 500000,
    },
    TOTAL_MONTHS_OF_COVER: 12,
    MAXIMUM_BUYER_CAN_OWE: 500000,
  },
};
