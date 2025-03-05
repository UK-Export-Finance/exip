import { GBP } from '../../supported-currencies';
import { ApplicationVersion } from '../../../../types';

const VERSION_1: ApplicationVersion = {
  VERSION_NUMBER: '1',
  OVER_500K_SUPPORT: false,
  MAXIMUM_BUYER_CAN_OWE: 500000,
  TOTAL_VALUE_OF_CONTRACT: 500000,
  DEFAULT_FINAL_DESTINATION_KNOWN: true,
  DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER: false,
  BROKER_ADDRESS_AS_MULTIPLE_FIELDS: true,
};

const VERSION_2: ApplicationVersion = {
  VERSION_NUMBER: '2',
  OVER_500K_SUPPORT: true,
  DEFAULT_FINAL_DESTINATION_KNOWN: null,
  DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER: null,
  DEFAULT_CURRENCY: GBP,
  BROKER_ADDRESS_AS_MULTIPLE_FIELDS: false,
};

const VERSION_3: ApplicationVersion = {
  ...VERSION_2,
  VERSION_NUMBER: '3',
  REQUESTED_CREDIT_LIMIT_REQUIRED: true,
  SMALL_EXPORT_BUILDER: {
    MAXIMUM_BUYER_WILL_OWE: 25000,
  },
};

const VERSION_4: ApplicationVersion = {
  ...VERSION_3,
  VERSION_NUMBER: '4',
  DECLARATIONS_MODERN_SLAVERY: true,
};

const VERSION_5: ApplicationVersion = {
  ...VERSION_4,
  VERSION_NUMBER: '5',
  BROKER_ADDRESS_LOOKUP: true,
};

/**
 * VERSIONS
 * All possible application versions.
 * These versions highlight changes to certain features involving data changes,
 * That differ as the service is iterated.
 * This should be manually updated each time a phase of EXIP is started. For example:
 * - Version number 1: MVP - No support for applications over 500k.
 * - Version number 2: "No PDF" - Support for applications over 500k.
 * - Version number 3: "No PDF" design and content iterations. 1x new database field.
 * - Version number 4: New declaration - "Modern slavery".
 * - Version number 5: Broker address lookup (Ordnance Survey integration)
 * - Version number 6: Payments integration
 * @returns {Array<ApplicationVersion>} All application versions
 */
const VERSIONS: Array<ApplicationVersion> = [VERSION_1, VERSION_2, VERSION_3, VERSION_4, VERSION_5];

export default VERSIONS;
