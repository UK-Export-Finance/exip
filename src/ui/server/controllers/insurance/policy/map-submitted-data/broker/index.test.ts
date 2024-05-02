import mapSubmittedData from '.';
import FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';

const {
  USING_BROKER,
  BROKER_DETAILS: { NAME, EMAIL, FULL_ADDRESS },
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
});
