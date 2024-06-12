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
    ABANDONED: 'Abandoned',
  },
  POLICY_TYPE: {
    SINGLE: 'Single contract policy',
    MULTIPLE: 'Multiple contract policy',
    ABBREVIATED: {
      SINGLE: 'Single',
      MULTIPLE: 'Multiple',
    },
  },
  POLICY: {
    TOTAL_VALUE_OF_CONTRACT: {
      MINIMUM: 1,
    },
    TOTAL_MONTHS_OF_COVER: 12,
  },
  EXPORT_CONTRACT: {
    AGENT_SERVICE_CHARGE: {
      METHOD: {
        FIXED_SUM: 'Fixed sum',
        PERCENTAGE: 'Percentage',
      },
    },
  },
};
