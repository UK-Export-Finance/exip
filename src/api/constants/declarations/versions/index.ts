import { ApplicationDeclarationVersions } from '../../../types';

/**
 * DECLARATION_VERSIONS
 * All possible declaration versions.
 * This should be manually updated each time declarations are updated
 * @returns {Array<ApplicationDeclarationVersions>} All declaration versions
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
    ANTI_BRIBERY: '222',
    ANTI_BRIBERY_CODE_OF_CONDUCT: '2.3',
    ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT: '4.4',
    CONFIDENTIALITY: '5.5',
    CONFIRMATION_AND_ACKNOWLEDGEMENTS: '6.6',
  },
] as Array<ApplicationDeclarationVersions>;

export default DECLARATION_VERSIONS;
