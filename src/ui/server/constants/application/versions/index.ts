import { ApplicationVersion } from '../../../../types';

/**
 * VERSIONS
 * All possible application versions.
 * During each phase of EXIP that contains major feature/data changes or additions,
 * the application version number should be changed.
 * For example:
 * - Version number 1: MVP, no support for applications over 500k.
 * - Version number 2: Support for applications over 500k.
 * - Version number 3: File uploads
 * - Version number 4: Address lookup
 * - Version number 5: Payments integration
 * @returns {Array<ApplicationVersion>} All application versions
 */
const VERSIONS = [
  {
    VERSION_NUMBER: '1',
    OVER_500K_SUPPORT: false,
    MAXIMUM_BUYER_CAN_OWE: 500000,
    TOTAL_VALUE_OF_CONTRACT: 500000,
    DEFAULT_FINAL_DESTINATION_KNOWN: true,
    DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER: false,
  },
  {
    VERSION_NUMBER: '2',
    OVER_500K_SUPPORT: true,
    DEFAULT_FINAL_DESTINATION_KNOWN: null,
    DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER: null,
  },
] as Array<ApplicationVersion>;

export default VERSIONS;
