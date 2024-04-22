import mapSubmittedData from '.';
import FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';

const {
  AGENT_CHARGES: { PERCENTAGE_CHARGE, FIXED_SUM_AMOUNT, METHOD },
} = FIELD_IDS;

describe('controllers/insurance/export-contract/map-submitted-data/agent-service-charge', () => {
  describe(`when ${PERCENTAGE_CHARGE} is provided`, () => {
    it(`should return the form body with mapped ${PERCENTAGE_CHARGE} as a number`, () => {
      const mockFormBody = {
        [PERCENTAGE_CHARGE]: '1',
      };

      const result = mapSubmittedData(mockFormBody);

      const expected = {
        [PERCENTAGE_CHARGE]: Number(mockFormBody[PERCENTAGE_CHARGE]),
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FIXED_SUM_AMOUNT} is provided`, () => {
    it(`should return the form body with mapped ${FIXED_SUM_AMOUNT} as a number`, () => {
      const mockFormBody = {
        [FIXED_SUM_AMOUNT]: '1',
      };

      const result = mapSubmittedData(mockFormBody);

      const expected = {
        [FIXED_SUM_AMOUNT]: Number(mockFormBody[FIXED_SUM_AMOUNT]),
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${PERCENTAGE_CHARGE} and ${FIXED_SUM_AMOUNT} are provided`, () => {
    it('should return the form body with both fields mapped as a number', () => {
      const mockFormBody = {
        [PERCENTAGE_CHARGE]: '0',
        [FIXED_SUM_AMOUNT]: '1',
      };

      const result = mapSubmittedData(mockFormBody);

      const expected = {
        [PERCENTAGE_CHARGE]: Number(mockFormBody[PERCENTAGE_CHARGE]),
        [FIXED_SUM_AMOUNT]: Number(mockFormBody[FIXED_SUM_AMOUNT]),
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when an empty ${METHOD} string is provided`, () => {
    it(`should return the form body with ${METHOD} as null`, () => {
      const mockFormBody = {
        [METHOD]: '',
      };

      const result = mapSubmittedData(mockFormBody);

      const expected = {
        [METHOD]: null,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when neither ${PERCENTAGE_CHARGE}, ${FIXED_SUM_AMOUNT} or ${METHOD} are provided`, () => {
    it('should return the form body as provided', () => {
      const mockFormBody = {
        mockField: true,
      };

      const result = mapSubmittedData(mockFormBody);

      expect(result).toEqual(mockFormBody);
    });
  });
});
