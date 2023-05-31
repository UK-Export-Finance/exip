import { ApplicationVersion } from '../../../../types';

/**
 * VERSIONS
 * All possible application versions.
 * This should be manually updated each time a phase of EXIP is started. For example:
 * - aVersion number 1: MVP, no support for applications over 500k.
 * - Version number 2: Support for applications over 500k.
 * - Version number 3: Payments integration
 * @returns {Array<ApplicationVersion>} All application versions
 */
const VERSIONS = [
  {
    VERSION_NUMBER: '1',
    OVER_500K_SUPPORT: false,
    MAXIMUM_BUYER_CAN_OWE: 499999,
    TOTAL_VALUE_OF_CONTRACT: 499999,
  },
] as Array<ApplicationVersion>;

export default VERSIONS;
