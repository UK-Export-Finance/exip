import mapSubmittedData from '.';
import FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';

const {
  USING_AGENT,
  AGENT_DETAILS: { NAME, FULL_ADDRESS, COUNTRY_CODE },
} = FIELD_IDS;

describe('controllers/insurance/export-contract/map-submitted-data/agent', () => {
  describe(`when ${USING_AGENT} is provided with a value of 'false'`, () => {
    it('should return the form body with empty AGENT_DETAILS values', () => {
      const mockFormBody = {
        [USING_AGENT]: 'false',
        [NAME]: 'mock name',
      };

      const result = mapSubmittedData(mockFormBody);

      const expected = {
        ...mockFormBody,
        [NAME]: '',
        [FULL_ADDRESS]: '',
        [COUNTRY_CODE]: '',
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${USING_AGENT} is provided with a value of 'true'`, () => {
    it('should return the form body as provided', () => {
      const mockFormBody = {
        [USING_AGENT]: 'true',
        [NAME]: 'mock name',
      };

      const result = mapSubmittedData(mockFormBody);

      const expected = mockFormBody;

      expect(result).toEqual(expected);
    });
  });
});
