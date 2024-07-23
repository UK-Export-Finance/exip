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

export const findLatestVersion = (contentStrings: ObjectType, section: string) =>
  contentStrings.VERSIONS.find((declarationContentStrings: ObjectType) => contentStrings.VERSION === declarationContentStrings?.[section]);

const getLatestDeclarationVersion = (versionNumber: string) => {
  const latestDeclarationVersion = VERSIONS.find((VERSION) => VERSION.VERSION_NUMBER === versionNumber);

  if (latestDeclarationVersion) {
    return {
      CONFIDENTIALITY: findLatestVersion(CONFIDENTIALITY, 'CONFIDENTIALITY'),
      ANTI_BRIBERY: findLatestVersion(ANTI_BRIBERY, 'ANTI_BRIBERY'),
      ANTI_BRIBERY_CODE_OF_CONDUCT: findLatestVersion(ANTI_BRIBERY_CODE_OF_CONDUCT, 'ANTI_BRIBERY_CODE_OF_CONDUCT'),
      ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT: findLatestVersion(
        ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT,
        'ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT',
      ),
      CONFIRMATION_AND_ACKNOWLEDGEMENTS: findLatestVersion(CONFIRMATION_AND_ACKNOWLEDGEMENTS, 'CONFIRMATION_AND_ACKNOWLEDGEMENTS'),
      HOW_YOUR_DATA_WILL_BE_USED: findLatestVersion(HOW_YOUR_DATA_WILL_BE_USED, 'HOW_YOUR_DATA_WILL_BE_USED'),
    };
  }

  console.error('Unable to find latest declaration version');

  throw new Error('Unable to find latest declaration version');
};

export default getLatestDeclarationVersion;
