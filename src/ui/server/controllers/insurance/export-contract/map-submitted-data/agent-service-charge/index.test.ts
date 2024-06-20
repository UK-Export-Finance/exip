import mapSubmittedData from '.';
import { APPLICATION } from '../../../../../constants';
import FIELD_IDS from '../../../../../constants/field-ids/insurance';
import { EUR, HKD } from '../../../../../test-mocks';

const {
  EXPORT_CONTRACT: {
    AGENT_SERVICE_CHARGE: {
      METHOD: { FIXED_SUM, PERCENTAGE },
    },
  },
} = APPLICATION;

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
  EXPORT_CONTRACT: {
    AGENT_CHARGES: { PERCENTAGE_CHARGE, FIXED_SUM_AMOUNT, FIXED_SUM_CURRENCY_CODE, METHOD },
  },
} = FIELD_IDS;

describe('controllers/insurance/export-contract/map-submitted-data/agent-service-charge', () => {
  describe(`when ${METHOD} is ${FIXED_SUM}`, () => {
    it('should return the form body with mapped data', () => {
      const mockFormBody = {
        [METHOD]: FIXED_SUM,
        [FIXED_SUM_AMOUNT]: '1',
        [ALTERNATIVE_CURRENCY_CODE]: EUR.isoCode,
        [CURRENCY_CODE]: EUR.isoCode,
      };

      const result = mapSubmittedData(mockFormBody);

      const expected = {
        ...mockFormBody,
        [FIXED_SUM_AMOUNT]: Number(mockFormBody[FIXED_SUM_AMOUNT]),
        [PERCENTAGE_CHARGE]: null,
        [FIXED_SUM_CURRENCY_CODE]: EUR.isoCode,
      };

      expect(result).toEqual(expected);
    });

    it(`should set ${ALTERNATIVE_CURRENCY_CODE} to null when ${CURRENCY_CODE} is NOT ${ALTERNATIVE_CURRENCY_CODE}`, () => {
      const mockFormBody = {
        [METHOD]: FIXED_SUM,
        [FIXED_SUM_AMOUNT]: '1',
        [ALTERNATIVE_CURRENCY_CODE]: HKD.isoCode,
        [CURRENCY_CODE]: EUR.isoCode,
      };

      const result = mapSubmittedData(mockFormBody);

      const expected = {
        ...mockFormBody,
        [FIXED_SUM_AMOUNT]: Number(mockFormBody[FIXED_SUM_AMOUNT]),
        [PERCENTAGE_CHARGE]: null,
        [FIXED_SUM_CURRENCY_CODE]: EUR.isoCode,
        [ALTERNATIVE_CURRENCY_CODE]: null,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${METHOD} is ${PERCENTAGE}`, () => {
    it('should return the form body with mapped data', () => {
      const mockFormBody = {
        [METHOD]: PERCENTAGE,
        [PERCENTAGE_CHARGE]: '1',
        [CURRENCY_CODE]: EUR.isoCode,
        [ALTERNATIVE_CURRENCY_CODE]: EUR.isoCode,
      };

      const result = mapSubmittedData(mockFormBody);

      const expected = {
        ...mockFormBody,
        [PERCENTAGE_CHARGE]: Number(mockFormBody[PERCENTAGE_CHARGE]),
        [FIXED_SUM_AMOUNT]: null,
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
});
