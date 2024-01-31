import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import mapSubmittedData from '.';
import { mockBusinessTurnover, mockApplication } from '../../../../../test-mocks';
import { stripCommas } from '../../../../../helpers/string';
import mapCurrencyCodeFormData from '../../../../../helpers/mappings/map-currency-code-form-data';
import { RequestBody } from '../../../../../../types';

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
  EXPORTER_BUSINESS: {
    TURNOVER: { ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER, TURNOVER_CURRENCY_CODE },
  },
} = INSURANCE_FIELD_IDS;

const {
  business: { estimatedAnnualTurnover, exportsTurnoverPercentage },
} = mockApplication;

describe('controllers/insurance/business/turnover/map-submitted-data', () => {
  describe('when all fields are provided and all number fields contain a comma', () => {
    it('should return the formBody with the commas replaced', () => {
      const mockBody = {
        _csrf: '1234',
        ...mockBusinessTurnover,
      } as RequestBody;

      const response = mapSubmittedData(mockBody);

      const expected = {
        [PERCENTAGE_TURNOVER]: stripCommas(mockBody[PERCENTAGE_TURNOVER]),
        [ESTIMATED_ANNUAL_TURNOVER]: stripCommas(mockBody[ESTIMATED_ANNUAL_TURNOVER]),
      };

      expect(response).toEqual(expected);
    });
  });

  describe('when all fields are provided and none contain a comma', () => {
    it('should return the formBody', () => {
      const mockBody = {
        _csrf: '1234',
        [ESTIMATED_ANNUAL_TURNOVER]: estimatedAnnualTurnover,
        [PERCENTAGE_TURNOVER]: exportsTurnoverPercentage,
      } as RequestBody;

      const response = mapSubmittedData(mockBody);

      const expected = {
        [ESTIMATED_ANNUAL_TURNOVER]: mockBody[ESTIMATED_ANNUAL_TURNOVER],
        [PERCENTAGE_TURNOVER]: mockBody[PERCENTAGE_TURNOVER],
      };

      expect(response).toEqual(expected);
    });
  });

  describe('when some fields are provided and none contain a comma', () => {
    it('should return the formBody with the populated fields populated, and the remaining as empty strings', () => {
      const mockBody = {
        _csrf: '1234',
        [ESTIMATED_ANNUAL_TURNOVER]: estimatedAnnualTurnover,
        [PERCENTAGE_TURNOVER]: '',
      } as RequestBody;

      const response = mapSubmittedData(mockBody);

      const expected = {
        [ESTIMATED_ANNUAL_TURNOVER]: mockBody[ESTIMATED_ANNUAL_TURNOVER],
        [PERCENTAGE_TURNOVER]: mockBody[PERCENTAGE_TURNOVER],
      };

      expect(response).toEqual(expected);
    });
  });

  describe('when no fields are provided (all are empty strings)', () => {
    it('should return the formBody with fields as empty strings', () => {
      const mockBody = {
        _csrf: '1234',
        [ESTIMATED_ANNUAL_TURNOVER]: '',
        [PERCENTAGE_TURNOVER]: '',
        [CURRENCY_CODE]: '',
        [ALTERNATIVE_CURRENCY_CODE]: '',
      } as RequestBody;

      const response = mapSubmittedData(mockBody);

      const expected = {
        [ESTIMATED_ANNUAL_TURNOVER]: mockBody[ESTIMATED_ANNUAL_TURNOVER],
        [PERCENTAGE_TURNOVER]: mockBody[PERCENTAGE_TURNOVER],
        [CURRENCY_CODE]: mockBody[CURRENCY_CODE],
        [ALTERNATIVE_CURRENCY_CODE]: mockBody[ALTERNATIVE_CURRENCY_CODE],
      };

      expect(response).toEqual(expected);
    });
  });

  describe(`when ${TURNOVER_CURRENCY_CODE} is provided`, () => {
    it('should return an object with mapCurrencyCodeFormData', () => {
      const mockBody = {
        [TURNOVER_CURRENCY_CODE]: mockApplication.business.turnoverCurrencyCode,
      };

      const result = mapSubmittedData(mockBody);

      const expected = mapCurrencyCodeFormData(mockBody, TURNOVER_CURRENCY_CODE);

      expect(result).toEqual(expected);
    });
  });
});
