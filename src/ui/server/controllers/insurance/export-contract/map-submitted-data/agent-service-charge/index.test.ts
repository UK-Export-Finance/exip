import mapSubmittedData from '.';
import FIELD_IDS from '../../../../../constants/field-ids/insurance';
import { EUR } from '../../../../../test-mocks';

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
  EXPORT_CONTRACT: {
    AGENT_CHARGES: { CHARGE_PERCENTAGE, FIXED_SUM_AMOUNT, FIXED_SUM_CURRENCY_CODE, METHOD },
  },
} = FIELD_IDS;

describe('controllers/insurance/export-contract/map-submitted-data/agent-service-charge', () => {
  describe(`when ${CHARGE_PERCENTAGE} is provided`, () => {
    it(`should return the form body with mapped ${CHARGE_PERCENTAGE} as a number`, () => {
      const mockFormBody = {
        [CHARGE_PERCENTAGE]: '1',
      };

      const result = mapSubmittedData(mockFormBody);

      const expected = {
        [CHARGE_PERCENTAGE]: Number(mockFormBody[CHARGE_PERCENTAGE]),
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

  describe(`when ${CHARGE_PERCENTAGE} and ${FIXED_SUM_AMOUNT} are provided`, () => {
    it('should return the form body with both fields mapped as a number', () => {
      const mockFormBody = {
        [CHARGE_PERCENTAGE]: '0',
        [FIXED_SUM_AMOUNT]: '1',
      };

      const result = mapSubmittedData(mockFormBody);

      const expected = {
        [CHARGE_PERCENTAGE]: Number(mockFormBody[CHARGE_PERCENTAGE]),
        [FIXED_SUM_AMOUNT]: Number(mockFormBody[FIXED_SUM_AMOUNT]),
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${CURRENCY_CODE} is provided`, () => {
    it(`should return the form body with ${FIXED_SUM_CURRENCY_CODE} as ${CURRENCY_CODE}`, () => {
      const mockFormBody = {
        [CURRENCY_CODE]: EUR.isoCode,
      };

      const result = mapSubmittedData(mockFormBody);

      const expected = {
        [FIXED_SUM_CURRENCY_CODE]: EUR.isoCode,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${ALTERNATIVE_CURRENCY_CODE} is provided`, () => {
    it(`should return the form body with ${FIXED_SUM_CURRENCY_CODE} as ${ALTERNATIVE_CURRENCY_CODE}`, () => {
      const mockFormBody = {
        [ALTERNATIVE_CURRENCY_CODE]: EUR.isoCode,
      };

      const result = mapSubmittedData(mockFormBody);

      const expected = {
        [FIXED_SUM_CURRENCY_CODE]: EUR.isoCode,
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

  describe(`when neither ${CHARGE_PERCENTAGE}, ${FIXED_SUM_AMOUNT} or ${METHOD} are provided`, () => {
    it('should return the form body as provided', () => {
      const mockFormBody = {
        mockField: true,
      };

      const result = mapSubmittedData(mockFormBody);

      expect(result).toEqual(mockFormBody);
    });
  });
});
