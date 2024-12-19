import mapSubmittedData from '.';
import FIELD_IDS from '../../../../../constants/field-ids/insurance/declarations';

const {
  MODERN_SLAVERY: { WILL_ADHERE_TO_ALL_REQUIREMENTS, HAS_NO_OFFENSES_OR_INVESTIGATIONS, IS_NOT_AWARE_OF_EXISTING_SLAVERY },
} = FIELD_IDS;

describe('controllers/insurance/declarations/map-submitted-data/modern-slavery', () => {
  describe(`when ${WILL_ADHERE_TO_ALL_REQUIREMENTS} is provided with an empty string`, () => {
    it(`should nullify ${WILL_ADHERE_TO_ALL_REQUIREMENTS}`, () => {
      const mockFormBody = {
        [WILL_ADHERE_TO_ALL_REQUIREMENTS]: '',
      };

      const result = mapSubmittedData(mockFormBody);

      const expected = {
        [WILL_ADHERE_TO_ALL_REQUIREMENTS]: null,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${HAS_NO_OFFENSES_OR_INVESTIGATIONS} is provided with an empty string`, () => {
    it(`should nullify ${HAS_NO_OFFENSES_OR_INVESTIGATIONS}`, () => {
      const mockFormBody = {
        [HAS_NO_OFFENSES_OR_INVESTIGATIONS]: '',
      };

      const result = mapSubmittedData(mockFormBody);

      const expected = {
        [HAS_NO_OFFENSES_OR_INVESTIGATIONS]: null,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${IS_NOT_AWARE_OF_EXISTING_SLAVERY} is provided with an empty string`, () => {
    it(`should nullify ${IS_NOT_AWARE_OF_EXISTING_SLAVERY}`, () => {
      const mockFormBody = {
        [IS_NOT_AWARE_OF_EXISTING_SLAVERY]: '',
      };

      const result = mapSubmittedData(mockFormBody);

      const expected = {
        [IS_NOT_AWARE_OF_EXISTING_SLAVERY]: null,
      };

      expect(result).toEqual(expected);
    });
  });
});
