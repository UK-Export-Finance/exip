import { ApplicationVersion } from '../../../types';

/**
 * VERSIONS
 * All possible application versions.
 * This should be manually updated each time a phase of EXIP is started. For example:
 * - Version number 1: MVP, no support for applications over 500k.
 * - Version number 2: Support for applications over 500k.
 * - Version number 3: Payments integration
 * @returns {Array<ApplicationVersion>} All application versions
 */
const VERSIONS = [
  {
    VERSION_NUMBER: '1',
    OVER_500K_SUPPORT: false,
    MAXIMUM_BUYER_CAN_OWE: 500000,
    TOTAL_VALUE_OF_CONTRACT: 500000,
    DEFAULT_FINAL_DESTINATION_KNOWN: true,
  },
] as Array<ApplicationVersion>;

export default VERSIONS;
