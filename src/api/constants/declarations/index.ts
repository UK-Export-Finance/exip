import { ApplicationDeclarationVersion } from '../../types';

/**
 * DECLARATION_VERSIONS
 * All possible declaration versions.
 * This should be manually updated each time declarations are updated
 * @returns {Array<ApplicationDeclarationVersion>} All declaration versions
 */
const DECLARATION_VERSIONS = [
  {
    ANTI_BRIBERY: '1',
    ANTI_BRIBERY_CODE_OF_CONDUCT: '1',
    ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT: '1',
    CONFIDENTIALITY: '1',
    CONFIRMATION_AND_ACKNOWLEDGEMENTS: '1',
    HOW_YOUR_DATA_WILL_BE_USED: '1',
  },
  {
    ANTI_BRIBERY: '1',
    ANTI_BRIBERY_CODE_OF_CONDUCT: '1',
    ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT: '1',
    CONFIDENTIALITY: '1',
    CONFIRMATION_AND_ACKNOWLEDGEMENTS: '1',
  },
] as Array<ApplicationDeclarationVersion>;

export default DECLARATION_VERSIONS;
