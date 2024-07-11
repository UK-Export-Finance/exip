import mapSubmittedData from '.';
import FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';

const {
  PRIVATE_MARKET: { ATTEMPTED, DECLINED_DESCRIPTION },
} = FIELD_IDS;

describe('controllers/insurance/export-contract/map-submitted-data/private-market', () => {
  describe(`when ${ATTEMPTED} is provided with a value of 'false'`, () => {
    it(`should return the form body with an empty ${DECLINED_DESCRIPTION} string`, () => {
      const mockFormBody = {
        [ATTEMPTED]: 'false',
        [DECLINED_DESCRIPTION]: 'mock description',
      };

      const result = mapSubmittedData(mockFormBody);

      const expected = {
        ...mockFormBody,
        [DECLINED_DESCRIPTION]: '',
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${ATTEMPTED} is provided with a value of 'true'`, () => {
    it('should return the form body as provided', () => {
      const mockFormBody = {
        [ATTEMPTED]: 'true',
        [DECLINED_DESCRIPTION]: 'mock description',
      };

      const result = mapSubmittedData(mockFormBody);

      const expected = mockFormBody;

      expect(result).toEqual(expected);
    });
  });
});
