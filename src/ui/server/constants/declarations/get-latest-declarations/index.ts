import VERSIONS from '../versions';
import MODERN_SLAVERY_VERSIONS from '../modern-slavery-versions';
import DECLARATIONS_FIELDS_IDS from '../../field-ids/insurance/declarations';
import DECLARATIONS_PAGE_CONTENT_STRINGS from '../../../content-strings/pages/insurance/declarations';
import { DECLARATIONS_FIELDS } from '../../../content-strings/fields/insurance/declarations';
import { ObjectType } from '../../../../types';

const { WILL_ADHERE_TO_ALL_REQUIREMENTS, HAS_NO_OFFENSES_OR_INVESTIGATIONS, IS_NOT_AWARE_OF_EXISTING_SLAVERY } = DECLARATIONS_FIELDS_IDS.MODERN_SLAVERY;

const { CONFIDENTIALITY, ANTI_BRIBERY, ANTI_BRIBERY_CODE_OF_CONDUCT, ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT, CONFIRMATION_AND_ACKNOWLEDGEMENTS } =
  DECLARATIONS_PAGE_CONTENT_STRINGS;

const { MODERN_SLAVERY } = DECLARATIONS_FIELDS;

/**
 * getDeclarationContentStringsByVersionId
 * Finds the latest content strings for a specified declaration section
 * @param {ObjectType} declarationContentStrings: Content strings for specified declaration
 * @param {string} latestVersionNumber: latest version for specified section
 * @returns {object} contentStrings: Content strings for specified version of declaration
 */
export const getDeclarationContentStringsByVersionId = (contentStrings: ObjectType, versionNumber: string) =>
  contentStrings.VERSIONS.find((strings: ObjectType) => strings.VERSION === versionNumber);

/**
 * getLatestDeclarationsVersion
 * gets the latest declaration versions for each declaration section
 * populates an object with the content strings for that version
 * @returns {object} contentStrings for the latest version of declarations
 */
const getLatestDeclarationsVersion = () => {
  const latestDeclarationVersions = VERSIONS[VERSIONS.length - 1];
  const latestDeclarationModernSlaveryVersions = MODERN_SLAVERY_VERSIONS[MODERN_SLAVERY_VERSIONS.length - 1];

  return {
    CONFIDENTIALITY: getDeclarationContentStringsByVersionId(CONFIDENTIALITY, latestDeclarationVersions.CONFIDENTIALITY),
    ANTI_BRIBERY: getDeclarationContentStringsByVersionId(ANTI_BRIBERY, latestDeclarationVersions.ANTI_BRIBERY),
    ANTI_BRIBERY_CODE_OF_CONDUCT: getDeclarationContentStringsByVersionId(ANTI_BRIBERY_CODE_OF_CONDUCT, latestDeclarationVersions.ANTI_BRIBERY_CODE_OF_CONDUCT),
    ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT: getDeclarationContentStringsByVersionId(
      ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT,
      latestDeclarationVersions.ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT,
    ),
    MODERN_SLAVERY: {
      WILL_ADHERE_TO_ALL_REQUIREMENTS: getDeclarationContentStringsByVersionId(
        MODERN_SLAVERY[WILL_ADHERE_TO_ALL_REQUIREMENTS],
        latestDeclarationModernSlaveryVersions.WILL_ADHERE_TO_ALL_REQUIREMENTS,
      ),
      HAS_NO_OFFENSES_OR_INVESTIGATIONS: getDeclarationContentStringsByVersionId(
        MODERN_SLAVERY[HAS_NO_OFFENSES_OR_INVESTIGATIONS],
        latestDeclarationModernSlaveryVersions.HAS_NO_OFFENSES_OR_INVESTIGATIONS,
      ),
      IS_NOT_AWARE_OF_EXISTING_SLAVERY: getDeclarationContentStringsByVersionId(
        MODERN_SLAVERY[IS_NOT_AWARE_OF_EXISTING_SLAVERY],
        latestDeclarationModernSlaveryVersions.IS_NOT_AWARE_OF_EXISTING_SLAVERY,
      ),
    },
    CONFIRMATION_AND_ACKNOWLEDGEMENTS: getDeclarationContentStringsByVersionId(
      CONFIRMATION_AND_ACKNOWLEDGEMENTS,
      latestDeclarationVersions.CONFIRMATION_AND_ACKNOWLEDGEMENTS,
    ),
  };
};

export default getLatestDeclarationsVersion;
