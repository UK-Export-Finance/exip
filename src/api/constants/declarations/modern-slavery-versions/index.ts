import { ApplicationDeclarationModernSlaveryVersions } from '../../../types';

const VERSION_1: ApplicationDeclarationModernSlaveryVersions = {
  WILL_ADHERE_TO_ALL_REQUIREMENTS: '1',
  HAS_NO_OFFENSES_OR_INVESTIGATIONS: '1',
  IS_NOT_AWARE_OF_EXISTING_SLAVERY: '1',
};

/**
 * DECLARATION_MODERN_SLAVERY_VERSIONS
 * All possible modern slavery declaration versions.
 * This should be manually updated each time declarations are updated
 * @returns {Array<ApplicationDeclarationModernSlaveryVersions>} All modern slavery declaration versions
 */
const DECLARATION_MODERN_SLAVERY_VERSIONS: Array<ApplicationDeclarationModernSlaveryVersions> = [VERSION_1];

export default DECLARATION_MODERN_SLAVERY_VERSIONS;
