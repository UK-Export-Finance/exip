import mapSubmittedData from '.';
import FIELD_IDS from '../../../../../constants/field-ids/insurance';

const {
  EXPORT_CONTRACT: {
    AGENT_SERVICE: { IS_CHARGING },
  },
} = FIELD_IDS;

describe('controllers/insurance/export-contract/map-submitted-data/agent-service', () => {
  describe(`when ${IS_CHARGING} is an empty string`, () => {
    it('should return the form body with mapped data', () => {
      const mockFormBody = {
        mock: true,
        [IS_CHARGING]: '',
      };

      const result = mapSubmittedData(mockFormBody);

      const expected = {
        ...mockFormBody,
        [IS_CHARGING]: null,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${IS_CHARGING} is NOT an empty string`, () => {
    it('should return the form body as is', () => {
      const mockFormBody = {
        mock: true,
        [IS_CHARGING]: false,
      };

      const result = mapSubmittedData(mockFormBody);

      expect(result).toEqual(mockFormBody);
    });
  });
});
