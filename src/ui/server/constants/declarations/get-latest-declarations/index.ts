import VERSIONS from '../versions';
import DECLARATIONS from '../../../content-strings/pages/insurance/declarations';
import { ObjectType } from '../../../../types';

const { CONFIDENTIALITY, ANTI_BRIBERY, ANTI_BRIBERY_CODE_OF_CONDUCT, ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT, CONFIRMATION_AND_ACKNOWLEDGEMENTS } =
  DECLARATIONS;

/**
 * getDeclarationContentStringsByVersionId
 * Finds the latest content strings for a specified declaration section
 * @param {ObjectType} declarationContentStrings: Content strings for specified declaration
 * @param {String} latestVersionNumber: latest version for specified section
 * @returns {Object} contentStrings: Content strings for specified version of declaration
 */
export const getDeclarationContentStringsByVersionId = (contentStrings: ObjectType, versionNumber: string) =>
  contentStrings.VERSIONS.find((strings: ObjectType) => strings.VERSION === versionNumber);

/**
 * getLatestDeclarationsVersion
 * gets the latest declaration versions for each declaration section
 * populates an object with the content strings for that version
 * @returns {Object} contentStrings for the latest version of declarations
 */
const getLatestDeclarationsVersion = () => {
  const latestDeclarationVersions = VERSIONS[VERSIONS.length - 1];

  return {
    CONFIDENTIALITY: getDeclarationContentStringsByVersionId(CONFIDENTIALITY, latestDeclarationVersions.CONFIDENTIALITY),
    ANTI_BRIBERY: getDeclarationContentStringsByVersionId(ANTI_BRIBERY, latestDeclarationVersions.ANTI_BRIBERY),
    ANTI_BRIBERY_CODE_OF_CONDUCT: getDeclarationContentStringsByVersionId(ANTI_BRIBERY_CODE_OF_CONDUCT, latestDeclarationVersions.ANTI_BRIBERY_CODE_OF_CONDUCT),
    ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT: getDeclarationContentStringsByVersionId(
      ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT,
      latestDeclarationVersions.ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT,
    ),
    CONFIRMATION_AND_ACKNOWLEDGEMENTS: getDeclarationContentStringsByVersionId(
      CONFIRMATION_AND_ACKNOWLEDGEMENTS,
      latestDeclarationVersions.CONFIRMATION_AND_ACKNOWLEDGEMENTS,
    ),
  };
};

export default getLatestDeclarationsVersion;
