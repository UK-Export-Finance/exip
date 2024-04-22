import mapSubmittedData from '.';
import { APPLICATION } from '../../../../../constants';
import FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';

const {
  EXPORT_CONTRACT: {
    AGENT_SERVICE_CHARGE: {
      METHOD: { FIXED_SUM, PERCENTAGE }
    },
  },
} = APPLICATION;

const {
  AGENT_CHARGES: { FIXED_SUM_AMOUNT, CHARGE_PERCENTAGE, METHOD },
} = FIELD_IDS;

describe('controllers/insurance/export-contract/map-submitted-data/agent-service-charge', () => {
  describe(`when ${METHOD} is ${PERCENTAGE}`, () => {
    it('should return the form body with mapped data', () => {
      const mockFormBody = {
        [METHOD]: PERCENTAGE,
        [CHARGE_PERCENTAGE]: '1',
      };

      const result = mapSubmittedData(mockFormBody);

      const expected = {
        ...mockFormBody,
        [CHARGE_PERCENTAGE]: Number(mockFormBody[CHARGE_PERCENTAGE]),
        [FIXED_SUM_AMOUNT]: null,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${METHOD} is ${FIXED_SUM}`, () => {
    it('should return the form body with mapped data', () => {
      const mockFormBody = {
        [METHOD]: FIXED_SUM,
        [FIXED_SUM_AMOUNT]: '1',
      };

      const result = mapSubmittedData(mockFormBody);

      const expected = {
        ...mockFormBody,
        [FIXED_SUM_AMOUNT]: Number(mockFormBody[FIXED_SUM_AMOUNT]),
        [CHARGE_PERCENTAGE]: null,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${METHOD} is an empty string`, () => {
    it(`should return ${METHOD} as null`, () => {
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
