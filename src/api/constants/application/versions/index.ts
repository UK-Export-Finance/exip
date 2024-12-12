import { ApplicationVersion } from '../../../types';
import { GBP } from '../../supported-currencies';

const VERSION_1 = {
  VERSION_NUMBER: '1',
  OVER_500K_SUPPORT: false,
  MAXIMUM_BUYER_CAN_OWE: 500000,
  TOTAL_VALUE_OF_CONTRACT: 500000,
  DEFAULT_FINAL_DESTINATION_KNOWN: true,
  DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER: false,
  BROKER_ADDRESS_AS_MULTIPLE_FIELDS: true,
} as ApplicationVersion;

const VERSION_2 = {
  VERSION_NUMBER: '2',
  OVER_500K_SUPPORT: true,
  DEFAULT_FINAL_DESTINATION_KNOWN: null,
  DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER: null,
  DEFAULT_CURRENCY: GBP,
  BROKER_ADDRESS_AS_MULTIPLE_FIELDS: false,
} as ApplicationVersion;

const VERSION_3 = {
  ...VERSION_2,
  VERSION_NUMBER: '3',
  REQUESTED_CREDIT_LIMIT_REQUIRED: true,
  SMALL_EXPORT_BUILDER: {
    MAXIMUM_BUYER_WILL_OWE: 25000,
  },
} as ApplicationVersion;

/**
 * VERSIONS
 * All possible application versions.
 * These versions highlight changes to certain features involving data changes,
 * That differ as the service is iterated.
 * This should be manually updated each time a phase of EXIP is started. For example:
 * - Version number 1: MVP, no support for applications over 500k.
 * - Version number 2: Support for applications over 500k.
 * - Version number 3: Design and content iterations. 1x new database field.
 * - Version number 4: Payments integration
 * @returns {Array<ApplicationVersion>} All application versions
 */
const VERSIONS = [VERSION_1, VERSION_2, VERSION_3] as Array<ApplicationVersion>;

export default VERSIONS;
