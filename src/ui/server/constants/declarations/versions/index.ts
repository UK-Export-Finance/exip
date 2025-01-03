import { ApplicationDeclarationVersions } from '../../../../types';

const VERSION_1: ApplicationDeclarationVersions = {
  ANTI_BRIBERY: '1',
  ANTI_BRIBERY_CODE_OF_CONDUCT: '1',
  ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT: '1',
  CONFIDENTIALITY: '1',
  CONFIRMATION_AND_ACKNOWLEDGEMENTS: '1',
  HOW_YOUR_DATA_WILL_BE_USED: '1',
};

const VERSION_2: ApplicationDeclarationVersions = {
  ANTI_BRIBERY: '2',
  ANTI_BRIBERY_CODE_OF_CONDUCT: '2',
  ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT: '1',
  CONFIDENTIALITY: '1',
  CONFIRMATION_AND_ACKNOWLEDGEMENTS: '1',
};

const VERSION_3: ApplicationDeclarationVersions = {
  ...VERSION_2,
  MODERN_SLAVERY: '1',
};

/**
 * DECLARATION_VERSIONS
 * All possible declaration versions.
 * This should be manually updated each time declarations are updated
 * @returns {Array<ApplicationDeclarationVersions>} All declaration versions
 */
const DECLARATION_VERSIONS: Array<ApplicationDeclarationVersions> = [VERSION_1, VERSION_2, VERSION_3];

export default DECLARATION_VERSIONS;
