import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import mapSubmittedData from '.';
import { mockBusinessTurnover, GBP, HKD } from '../../../../../test-mocks';
import { stripCommas } from '../../../../../helpers/string';
import { RequestBody } from '../../../../../../types';

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
  EXPORTER_BUSINESS: {
    TURNOVER: { ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER, TURNOVER_CURRENCY_CODE },
  },
} = INSURANCE_FIELD_IDS;

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
        [ESTIMATED_ANNUAL_TURNOVER]: '1000',
        [PERCENTAGE_TURNOVER]: '20',
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
        [ESTIMATED_ANNUAL_TURNOVER]: '1000',
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

  describe(`when ${CURRENCY_CODE} is provided`, () => {
    it(`should return ${TURNOVER_CURRENCY_CODE} as ${CURRENCY_CODE}`, () => {
      const mockBody = {
        _csrf: '1234',
        [ESTIMATED_ANNUAL_TURNOVER]: '1000',
        [PERCENTAGE_TURNOVER]: '',
        [CURRENCY_CODE]: GBP,
        [ALTERNATIVE_CURRENCY_CODE]: '',
      } as RequestBody;

      const response = mapSubmittedData(mockBody);

      const expected = {
        [ESTIMATED_ANNUAL_TURNOVER]: mockBody[ESTIMATED_ANNUAL_TURNOVER],
        [PERCENTAGE_TURNOVER]: mockBody[PERCENTAGE_TURNOVER],
        [TURNOVER_CURRENCY_CODE]: mockBody[CURRENCY_CODE],
      };

      expect(response).toEqual(expected);
    });
  });

  describe(`when ${ALTERNATIVE_CURRENCY_CODE} is provided`, () => {
    it(`should return ${TURNOVER_CURRENCY_CODE} as ${ALTERNATIVE_CURRENCY_CODE}`, () => {
      const mockBody = {
        _csrf: '1234',
        [ESTIMATED_ANNUAL_TURNOVER]: '1000',
        [PERCENTAGE_TURNOVER]: '',
        [ALTERNATIVE_CURRENCY_CODE]: HKD,
        [CURRENCY_CODE]: '',
      } as RequestBody;

      const response = mapSubmittedData(mockBody);

      const expected = {
        [ESTIMATED_ANNUAL_TURNOVER]: mockBody[ESTIMATED_ANNUAL_TURNOVER],
        [PERCENTAGE_TURNOVER]: mockBody[PERCENTAGE_TURNOVER],
        [TURNOVER_CURRENCY_CODE]: mockBody[ALTERNATIVE_CURRENCY_CODE],
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
});
