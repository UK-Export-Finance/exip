import getLatestDeclarationVersion, { getDeclarationContentStringsByVersionId } from '.';
import VERSIONS from '../versions';
import MODERN_SLAVERY_VERSIONS from '../modern-slavery-versions';
import DECLARATIONS_FIELDS_IDS from '../../field-ids/insurance/declarations';
import DECLARATIONS_PAGE_CONTENT_STRINGS from '../../../content-strings/pages/insurance/declarations';
import { DECLARATIONS_FIELDS } from '../../../content-strings/fields/insurance/declarations';

const { WILL_ADHERE_TO_ALL_REQUIREMENTS, HAS_NO_OFFENSES_OR_INVESTIGATIONS, IS_NOT_AWARE_OF_EXISTING_SLAVERY } = DECLARATIONS_FIELDS_IDS.MODERN_SLAVERY;

const { CONFIDENTIALITY, ANTI_BRIBERY, ANTI_BRIBERY_CODE_OF_CONDUCT, ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT, CONFIRMATION_AND_ACKNOWLEDGEMENTS } =
  DECLARATIONS_PAGE_CONTENT_STRINGS;

const { MODERN_SLAVERY } = DECLARATIONS_FIELDS;

describe('server/constants/declarations/get-latest-declarations', () => {
  describe('getDeclarationContentStringsByVersionId', () => {
    it('should find content strings by version', () => {
      const result = getDeclarationContentStringsByVersionId(CONFIDENTIALITY, VERSIONS[2].CONFIDENTIALITY);

      const [expected] = CONFIDENTIALITY.VERSIONS;

      expect(result).toEqual(expected);
    });
  });

  describe('getLatestDeclarationVersion', () => {
    it('should return the latest declaration versions', () => {
      const result = getLatestDeclarationVersion();

      const expected = {
        CONFIDENTIALITY: CONFIDENTIALITY.VERSIONS[0],
        ANTI_BRIBERY: ANTI_BRIBERY.VERSIONS[1],
        ANTI_BRIBERY_CODE_OF_CONDUCT: ANTI_BRIBERY_CODE_OF_CONDUCT.VERSIONS[1],
        ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT: ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT.VERSIONS[0],
        MODERN_SLAVERY: {
          WILL_ADHERE_TO_ALL_REQUIREMENTS: getDeclarationContentStringsByVersionId(
            MODERN_SLAVERY[WILL_ADHERE_TO_ALL_REQUIREMENTS],
            MODERN_SLAVERY_VERSIONS[0].WILL_ADHERE_TO_ALL_REQUIREMENTS,
          ),
          HAS_NO_OFFENSES_OR_INVESTIGATIONS: getDeclarationContentStringsByVersionId(
            MODERN_SLAVERY[HAS_NO_OFFENSES_OR_INVESTIGATIONS],
            MODERN_SLAVERY_VERSIONS[0].HAS_NO_OFFENSES_OR_INVESTIGATIONS,
          ),
          IS_NOT_AWARE_OF_EXISTING_SLAVERY: getDeclarationContentStringsByVersionId(
            MODERN_SLAVERY[IS_NOT_AWARE_OF_EXISTING_SLAVERY],
            MODERN_SLAVERY_VERSIONS[0].IS_NOT_AWARE_OF_EXISTING_SLAVERY,
          ),
        },
        CONFIRMATION_AND_ACKNOWLEDGEMENTS: CONFIRMATION_AND_ACKNOWLEDGEMENTS.VERSIONS[0],
      };

      expect(result).toEqual(expected);
    });
  });
});
