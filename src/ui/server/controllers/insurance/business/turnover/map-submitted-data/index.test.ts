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
      const mockBody: RequestBody = {
        _csrf: '1234',
        ...mockBusinessTurnover,
      };

      const response = mapSubmittedData(mockBody);

      const expected = {
        [PERCENTAGE_TURNOVER]: Number(stripCommas(mockBody[PERCENTAGE_TURNOVER])),
        [ESTIMATED_ANNUAL_TURNOVER]: stripCommas(mockBody[ESTIMATED_ANNUAL_TURNOVER]),
      };

      expect(response).toEqual(expected);
    });
  });

  describe('when all fields are provided and none contain a comma', () => {
    it(`should return the formBody with ${PERCENTAGE_TURNOVER} as a number`, () => {
      const mockBody: RequestBody = {
        _csrf: '1234',
        [ESTIMATED_ANNUAL_TURNOVER]: estimatedAnnualTurnover,
        [PERCENTAGE_TURNOVER]: exportsTurnoverPercentage,
      };

      const response = mapSubmittedData(mockBody);

      const expected = {
        [ESTIMATED_ANNUAL_TURNOVER]: mockBody[ESTIMATED_ANNUAL_TURNOVER],
        [PERCENTAGE_TURNOVER]: Number(mockBody[PERCENTAGE_TURNOVER]),
      };

      expect(response).toEqual(expected);
    });
  });

  describe('when some fields are provided and none contain a comma', () => {
    it('should return the formBody with the populated fields populated, and the remaining as empty strings', () => {
      const mockBody: RequestBody = {
        _csrf: '1234',
        [ESTIMATED_ANNUAL_TURNOVER]: estimatedAnnualTurnover,
        [PERCENTAGE_TURNOVER]: '',
      };

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
      const mockBody: RequestBody = {
        _csrf: '1234',
        [ESTIMATED_ANNUAL_TURNOVER]: '',
        [PERCENTAGE_TURNOVER]: '',
        [CURRENCY_CODE]: '',
        [ALTERNATIVE_CURRENCY_CODE]: '',
      };

      const response = mapSubmittedData(mockBody);

      const expected = {
        [ESTIMATED_ANNUAL_TURNOVER]: mockBody[ESTIMATED_ANNUAL_TURNOVER],
        [PERCENTAGE_TURNOVER]: mockBody[PERCENTAGE_TURNOVER],
      };

      expect(response).toEqual(expected);
    });
  });

  describe(`when ${CURRENCY_CODE} is provided`, () => {
    it('should return an object via  mapCurrencyCodeFormData', () => {
      const mockBody: RequestBody = {
        [CURRENCY_CODE]: mockApplication.business.turnoverCurrencyCode,
      };

      const result = mapSubmittedData(mockBody);

      const mappedCurrency = mapCurrencyCodeFormData(mockBody);

      const expected = {
        [TURNOVER_CURRENCY_CODE]: mappedCurrency[CURRENCY_CODE],
      };

      expect(result).toEqual(expected);
    });
  });
});
