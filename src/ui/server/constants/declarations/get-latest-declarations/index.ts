import VERSIONS from '../versions';
import DECLARATIONS from '../../../content-strings/pages/insurance/declarations';
import { ObjectType } from '../../../../types';

const { CONFIDENTIALITY, ANTI_BRIBERY, ANTI_BRIBERY_CODE_OF_CONDUCT, ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT, CONFIRMATION_AND_ACKNOWLEDGEMENTS } =
  DECLARATIONS;

/**
 * findLatestVersion
 * Finds the latest content strings for a specified declaration section
 * @param {ObjectType} declarationContentStrings: Content strings for specified declaration
 * @param {string} latestVersionNumber: latest version for specified section
 * @returns {Object} contentStrings: Content strings for specified version of declaration
 */
export const findLatestVersion = (declarationContentStrings: ObjectType, latestVersionNumber: string) =>
  declarationContentStrings.VERSIONS.find((contentStrings: ObjectType) => contentStrings.VERSION === latestVersionNumber);

/**
 * getLatestDeclarationsVersion
 * gets the latest declaration versions for each declaration section
 * populates an object with the content strings for that version
 * @returns {Object} contentStrings for the latest version of declarations
 */
const getLatestDeclarationsVersion = () => {
  // get latest declaration versions
  const latestDeclarationVersions = VERSIONS[VERSIONS.length - 1];

  return {
    CONFIDENTIALITY: findLatestVersion(CONFIDENTIALITY, latestDeclarationVersions.CONFIDENTIALITY),
    ANTI_BRIBERY: findLatestVersion(ANTI_BRIBERY, latestDeclarationVersions.ANTI_BRIBERY),
    ANTI_BRIBERY_CODE_OF_CONDUCT: findLatestVersion(ANTI_BRIBERY_CODE_OF_CONDUCT, latestDeclarationVersions.ANTI_BRIBERY_CODE_OF_CONDUCT),
    ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT: findLatestVersion(
      ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT,
      latestDeclarationVersions.ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT,
    ),
    CONFIRMATION_AND_ACKNOWLEDGEMENTS: findLatestVersion(CONFIRMATION_AND_ACKNOWLEDGEMENTS, latestDeclarationVersions.CONFIRMATION_AND_ACKNOWLEDGEMENTS),
  };
};

export default getLatestDeclarationsVersion;
