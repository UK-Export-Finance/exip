import getApplicationDefinition from './get-application-definition';
import VERSIONS from './versions';
import LATEST_VERSION_NUMBER from './versions/latest';

const LATEST_VERSION = getApplicationDefinition(LATEST_VERSION_NUMBER);

export const APPLY = 'Apply';

export const APPLICATION = {
  LATEST_VERSION,
  LATEST_VERSION_NUMBER,
  DEAL_TYPE: 'EXIP',
  SUBMISSION_COUNT_DEFAULT: 0,
  SUBMISSION_DEADLINE_IN_MONTHS: 1,
  SUBMISSION_DEADLINE_IN_DAYS: 30,
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
    TOTAL_MONTHS_OF_COVER: {
      MINIMUM: 1,
      MAXIMUM: 12,
    },
  },
  EXPORT_CONTRACT: {
    AGENT_SERVICE_CHARGE: {
      METHOD: {
        FIXED_SUM: 'Fixed sum',
        PERCENTAGE: 'Percentage',
      },
    },
  },
  VERSIONS,
};
