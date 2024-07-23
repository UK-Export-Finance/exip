import { ApplicationDeclarationVersion } from '../../../../types';

/**
 * VERSIONS
 * All possible declaration versions.
 * This should be manually updated each time a phase of EXIP is started. For example:
 * - Version number 1: MVP, no support for applications over 500k.
 * - Version number 2: Support for applications over 500k.
 * - Version number 3: Payments integration
 * @returns {Array<ApplicationVersion>} All declaration versions
 */
const VERSIONS = [
  {
    VERSION_NUMBER: '1',
    CONFIDENTIALITY: 1,
    ANTI_BRIBERY: 1,
    ANTI_BRIBERY_CODE_OF_CONDUCT: 1,
    ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT: 1,
    CONFIRMATION_AND_ACKNOWLEDGEMENTS: 1,
    HOW_YOUR_DATA_WILL_BE_USED: 1,
  },
  {
    VERSION_NUMBER: '2',
    CONFIDENTIALITY: 1,
    ANTI_BRIBERY: 1,
    ANTI_BRIBERY_CODE_OF_CONDUCT: 1,
    ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT: 1,
    CONFIRMATION_AND_ACKNOWLEDGEMENTS: 1,
    HOW_YOUR_DATA_WILL_BE_USED: 1,
  },
] as Array<ApplicationDeclarationVersion>;

export default VERSIONS;
