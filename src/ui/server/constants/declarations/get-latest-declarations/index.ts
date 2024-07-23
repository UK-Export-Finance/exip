import VERSIONS from '../versions';
import DECLARATIONS from '../../../content-strings/pages/insurance/declarations';
import { ObjectType } from '../../../../types';

const {
  CONFIDENTIALITY,
  ANTI_BRIBERY,
  ANTI_BRIBERY_CODE_OF_CONDUCT,
  ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT,
  CONFIRMATION_AND_ACKNOWLEDGEMENTS,
  HOW_YOUR_DATA_WILL_BE_USED,
} = DECLARATIONS;

/**
 * findLatestVersion
 * Finds the latest content strings for a specified declaration section
 * @param {ObjectType} declarationContentStrings: Content strings for specified declaration
 * @param {number} sectionLatestVersion: latest version for specified section
 * @returns {Object} contentStrings: Content strings for specified version of declaration
 */
export const findLatestVersion = (declarationContentStrings: ObjectType, sectionLatestVersion: number) =>
  declarationContentStrings.VERSIONS.find((contentStrings: ObjectType) => contentStrings.VERSION === sectionLatestVersion);

/**
 * getLatestDeclarationVersion
 * gets the latest declaration versions for each declaration section
 * populates an object with the content strings for that version
 * @param {String} versionNumber: latest version for declarations
 * @returns {Object} contentStrings for the latest version of declarations
 */
const getLatestDeclarationVersion = (versionNumber: string) => {
  const latestDeclarationVersion = VERSIONS.find((VERSION) => VERSION.VERSION_NUMBER === versionNumber);

  if (latestDeclarationVersion) {
    return {
      CONFIDENTIALITY: findLatestVersion(CONFIDENTIALITY, latestDeclarationVersion.CONFIDENTIALITY),
      ANTI_BRIBERY: findLatestVersion(ANTI_BRIBERY, latestDeclarationVersion.ANTI_BRIBERY),
      ANTI_BRIBERY_CODE_OF_CONDUCT: findLatestVersion(ANTI_BRIBERY_CODE_OF_CONDUCT, latestDeclarationVersion.ANTI_BRIBERY_CODE_OF_CONDUCT),
      ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT: findLatestVersion(
        ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT,
        latestDeclarationVersion.ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT,
      ),
      CONFIRMATION_AND_ACKNOWLEDGEMENTS: findLatestVersion(CONFIRMATION_AND_ACKNOWLEDGEMENTS, latestDeclarationVersion.CONFIRMATION_AND_ACKNOWLEDGEMENTS),
      HOW_YOUR_DATA_WILL_BE_USED: findLatestVersion(HOW_YOUR_DATA_WILL_BE_USED, latestDeclarationVersion.HOW_YOUR_DATA_WILL_BE_USED),
    };
  }

  console.error('Unable to find latest declaration version');

  throw new Error('Unable to find latest declaration version');
};

export default getLatestDeclarationVersion;
