import getApplicationDefinition from './get-application-definition';
import LATEST_VERSION_NUMBER from './versions/latest';

const LATEST_VERSION = getApplicationDefinition(LATEST_VERSION_NUMBER);

/**
 * APPLICATION
 * Application constants - some fields are dynamic depending on the latest application version.
 * These constants are used to create an update an application.
 * The following fields could or will change in future versions, so they are dynamic:
 * - TOTAL_VALUE_OF_CONTRACT
 * - MAXIMUM_BUYER_CAN_OWE
 * - FINAL_DESTINATION_KNOWN
 * - DEFAULT_FINAL_DESTINATION_KNOWN
 * - DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER
 * @returns {Object} Application constants
 */
export const APPLICATION = {
  LATEST_VERSION,
  DEAL_TYPE: 'EXIP',
  SUBMISSION_COUNT_DEFAULT: 0,
  SUBMISSION_DEADLINE_IN_MONTHS: 1,
  SUBMISSION_TYPE: {
    MIA: 'Manual Inclusion Application',
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
      MAXIMUM: LATEST_VERSION.TOTAL_VALUE_OF_CONTRACT,
    },
    TOTAL_MONTHS_OF_COVER: 12,
    MAXIMUM_BUYER_CAN_OWE: LATEST_VERSION.MAXIMUM_BUYER_CAN_OWE,
  },
  STATUS: {
    IN_PROGRESS: 'In progress',
    SUBMITTED: 'Submitted to UKEF',
    ABANDONED: 'Abandoned',
  },
  DEFAULT_FINAL_DESTINATION_KNOWN: LATEST_VERSION.DEFAULT_FINAL_DESTINATION_KNOWN,
  DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER: LATEST_VERSION.DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER,
  DEFAULT_CURRENCY: LATEST_VERSION.DEFAULT_CURRENCY,
  EXPORT_CONTRACT: {
    AGENT_SERVICE_CHARGE: {
      METHOD: {
        FIXED_SUM: 'Fixed sum',
        PERCENTAGE: 'Percentage',
      },
    },
  },
};

export default APPLICATION;
