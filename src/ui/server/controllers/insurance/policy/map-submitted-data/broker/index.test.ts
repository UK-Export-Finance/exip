import mapSubmittedData from '.';
import FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';

const {
  USING_BROKER,
  BROKER_DETAILS: { BUILDING_NUMBER_OR_NAME, EMAIL, IS_BASED_IN_UK, NAME, ADDRESS_LINE_1, ADDRESS_LINE_2, TOWN, COUNTY, POSTCODE },
  BROKER_ADDRESSES: { SELECT_THE_ADDRESS },
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS },
} = FIELD_IDS;

const mockFullyPopulatedBrokerBody = {
  [USING_BROKER]: 'false',
  [NAME]: 'mock name',
  [FULL_ADDRESS]: 'Mock full address',
  [BUILDING_NUMBER_OR_NAME]: 'Mock building name',
  [ADDRESS_LINE_1]: 'Mock address line 1',
  [ADDRESS_LINE_2]: 'Mock address line 2',
  [TOWN]: 'Mock town',
  [COUNTY]: 'Mock county',
  [POSTCODE]: 'Mock postcode',
};

describe('controllers/insurance/policy/map-submitted-data/broker', () => {
  describe(`when ${USING_BROKER} is provided with a value of 'false'`, () => {
    it(`should return the form body with nullified/empty ${USING_BROKER} related values`, () => {
      const mockFormBody = {
        ...mockFullyPopulatedBrokerBody,
        [USING_BROKER]: 'false',
      };

      const result = mapSubmittedData(mockFormBody);

      const expected = {
        ...mockFormBody,
        [NAME]: '',
        [EMAIL]: '',
        [IS_BASED_IN_UK]: null,
        [FULL_ADDRESS]: '',
        [BUILDING_NUMBER_OR_NAME]: '',
        [ADDRESS_LINE_1]: '',
        [ADDRESS_LINE_2]: '',
        [TOWN]: '',
        [COUNTY]: '',
        [POSTCODE]: '',
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
    it(`should return the form body with nullified/empty ${IS_BASED_IN_UK} related values`, () => {
      const mockFormBody = {
        ...mockFullyPopulatedBrokerBody,
        [IS_BASED_IN_UK]: '',
      };

      const result = mapSubmittedData(mockFormBody);

      const expected = {
        ...mockFormBody,
        [IS_BASED_IN_UK]: null,
        [FULL_ADDRESS]: '',
        [BUILDING_NUMBER_OR_NAME]: '',
        [ADDRESS_LINE_1]: '',
        [ADDRESS_LINE_2]: '',
        [TOWN]: '',
        [COUNTY]: '',
        [POSTCODE]: '',
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
