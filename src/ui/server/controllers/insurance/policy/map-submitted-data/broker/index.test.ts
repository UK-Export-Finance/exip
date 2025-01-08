import mapSubmittedData from '.';
import FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';

const {
  USING_BROKER,
  BROKER_DETAILS: { BUILDING_NUMBER_OR_NAME, EMAIL, IS_BASED_IN_UK, NAME, POSTCODE },
  BROKER_ADDRESSES: { SELECT_THE_ADDRESS },
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS },
} = FIELD_IDS;

describe('controllers/insurance/policy/map-submitted-data/broker', () => {
  describe(`when ${USING_BROKER} is provided with a value of 'false'`, () => {
    it('should return the form body with empty BROKER_DETAILS values', () => {
      const mockFormBody = {
        [USING_BROKER]: 'false',
        [NAME]: 'mock name',
      };

      const result = mapSubmittedData(mockFormBody);

      const expected = {
        ...mockFormBody,
        [NAME]: '',
        [EMAIL]: '',
        [FULL_ADDRESS]: '',
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${USING_BROKER} is provided with a value of 'true'`, () => {
    it('should return the form body as provided', () => {
      const mockFormBody = {
        [USING_BROKER]: 'true',
        [NAME]: 'mock name',
      };

      const result = mapSubmittedData(mockFormBody);

      const expected = mockFormBody;

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${USING_BROKER} is provided as an empty string`, () => {
    it(`should delete ${USING_BROKER}`, () => {
      const mockFormBody = {
        [USING_BROKER]: '',
      };

      const result = mapSubmittedData(mockFormBody);

      expect(result).toEqual({});
    });
  });

  describe(`when ${IS_BASED_IN_UK} is provided as an empty string`, () => {
    it(`should return the form body with empty ${IS_BASED_IN_UK} values`, () => {
      const mockFormBody = {
        [IS_BASED_IN_UK]: '',
      };

      const result = mapSubmittedData(mockFormBody);

      const expected = {
        ...mockFormBody,
        [POSTCODE]: '',
        [BUILDING_NUMBER_OR_NAME]: '',
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${SELECT_THE_ADDRESS} is provided as an empty string`, () => {
    it(`should delete ${SELECT_THE_ADDRESS}`, () => {
      const mockFormBody = {
        [SELECT_THE_ADDRESS]: '',
        [POSTCODE]: '',
      };

      const result = mapSubmittedData(mockFormBody);

      const expected = {
        [POSTCODE]: '',
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${SELECT_THE_ADDRESS} is provided with a value`, () => {
    it(`should delete ${SELECT_THE_ADDRESS}`, () => {
      const mockFormBody = {
        [SELECT_THE_ADDRESS]: '0',
        [POSTCODE]: '',
      };

      const result = mapSubmittedData(mockFormBody);

      const expected = {
        [POSTCODE]: '',
      };

      expect(result).toEqual(expected);
    });
  });
});
