import getLatestDeclarationVersion, { findLatestVersion } from '.';
import VERSIONS from '../versions';
import DECLARATIONS from '../../../content-strings/pages/insurance/declarations';

const { CONFIDENTIALITY, ANTI_BRIBERY, ANTI_BRIBERY_CODE_OF_CONDUCT, ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT, CONFIRMATION_AND_ACKNOWLEDGEMENTS } =
  DECLARATIONS;

describe('server/constants/declarations/get-latest-declarations', () => {
  describe('findLatestVersion', () => {
    it('should find content strings by version', () => {
      const result = findLatestVersion(CONFIDENTIALITY, VERSIONS[1].CONFIDENTIALITY);

      const [expected] = CONFIDENTIALITY.VERSIONS;

      expect(result).toEqual(expected);
    });
  });

  describe('getLatestDeclarationVersion', () => {
    it('should return the latest declaration versions', () => {
      const result = getLatestDeclarationVersion();

      const expected = {
        CONFIDENTIALITY: CONFIDENTIALITY.VERSIONS[0],
        ANTI_BRIBERY: ANTI_BRIBERY.VERSIONS[0],
        ANTI_BRIBERY_CODE_OF_CONDUCT: ANTI_BRIBERY_CODE_OF_CONDUCT.VERSIONS[0],
        ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT: ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT.VERSIONS[0],
        CONFIRMATION_AND_ACKNOWLEDGEMENTS: CONFIRMATION_AND_ACKNOWLEDGEMENTS.VERSIONS[0],
      };

      expect(result).toEqual(expected);
    });
  });
});
