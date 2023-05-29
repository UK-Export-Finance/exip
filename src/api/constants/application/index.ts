import getApplicationDefinition from './get-application-definition';
import LATEST_VERSION_NUMBER from './versions/latest';

const LATEST_VERSION = getApplicationDefinition(LATEST_VERSION_NUMBER);

/**
 * APPLICATION
 * Application constants - some fields are dynamic depending on the latest application version.
 * These constants are used to create an update an application.
 * The following fields could change in future versions, so they are dynamic:
 * - TOTAL_VALUE_OF_CONTRACT
 * - MAXIMUM_BUYER_CAN_OWE
 * @returns {Object} Application constants
 */
export const APPLICATION = {
  LATEST_VERSION,
  SUBMISSION_TYPE: {
    MIA: 'Manual Inclusion Application',
  },
  SUBMISSION_DEADLINE_IN_MONTHS: 1,
  POLICY_TYPE: {
    SINGLE: 'Single contract policy',
    MULTIPLE: 'Multiple contract policy',
  },
  POLICY_AND_EXPORT: {
    TOTAL_VALUE_OF_CONTRACT: {
      MINIMUM: 1,
      MAXIMUM: LATEST_VERSION.TOTAL_VALUE_OF_CONTRACT,
    },
    TOTAL_MONTHS_OF_COVER: 12,
    MAXIMUM_BUYER_CAN_OWE: LATEST_VERSION.MAXIMUM_BUYER_CAN_OWE,
  },
  STATUS: {
    DRAFT: 'Draft',
    SUBMITTED: 'Submitted to UKEF',
  },
};

// TODO create ticket for Abhi more VMs for GHA tests
