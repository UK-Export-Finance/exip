import mapSubmittedData from '.';
import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import YOUR_BUYER_FIELD_IDS from '../../../../../constants/field-ids/insurance/your-buyer';
import { GBP, NON_STANDARD_CURRENCY_CODE } from '../../../../../constants';
import { RequestBody } from '../../../../../../types';

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

const { OUTSTANDING_PAYMENTS, TOTAL_OUTSTANDING_PAYMENTS, TOTAL_AMOUNT_OVERDUE } = YOUR_BUYER_FIELD_IDS;

describe('controllers/insurance/your-buyer/map-submitted-data/buyer-trading-history', () => {
  let mockFormBody: RequestBody;

  beforeEach(() => {
    mockFormBody = {
      _csrf: 'abc',
      [CURRENCY_CODE]: GBP,
      [ALTERNATIVE_CURRENCY_CODE]: '',
      other: 'other field input',
    };
  });

  describe(`when ${CURRENCY_CODE} is not equal to ${ALTERNATIVE_CURRENCY_CODE}`, () => {
    it(`should return mockFormBody without _csrf and ${ALTERNATIVE_CURRENCY_CODE}`, () => {
      const result = mapSubmittedData(mockFormBody);

      const { _csrf, alternativeCurrencyCode, ...expectedBody } = mockFormBody;

      expect(result).toEqual(expectedBody);
    });
  });

  describe(`when ${CURRENCY_CODE} is equal to ${ALTERNATIVE_CURRENCY_CODE}`, () => {
    it(`should return mockFormBody without _csrf and ${ALTERNATIVE_CURRENCY_CODE} and ${CURRENCY_CODE} set to ${ALTERNATIVE_CURRENCY_CODE}'s value`, () => {
      mockFormBody[CURRENCY_CODE] = ALTERNATIVE_CURRENCY_CODE;
      mockFormBody[ALTERNATIVE_CURRENCY_CODE] = NON_STANDARD_CURRENCY_CODE;

      const result = mapSubmittedData(mockFormBody);

      const { _csrf, alternativeCurrencyCode, ...expectedBody } = mockFormBody;

      const expected = {
        ...expectedBody,
        [CURRENCY_CODE]: NON_STANDARD_CURRENCY_CODE,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${OUTSTANDING_PAYMENTS} is set to "false"`, () => {
    it(`should return mockFormBody without _csrf and ${TOTAL_OUTSTANDING_PAYMENTS} and ${TOTAL_AMOUNT_OVERDUE} set to "null"`, () => {
      mockFormBody[OUTSTANDING_PAYMENTS] = 'false';

      const result = mapSubmittedData(mockFormBody);

      const { _csrf, alternativeCurrencyCode, ...expectedBody } = mockFormBody;

      const expected = {
        ...expectedBody,
        [TOTAL_OUTSTANDING_PAYMENTS]: null,
        [TOTAL_AMOUNT_OVERDUE]: null,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${TOTAL_OUTSTANDING_PAYMENTS} is set to an empty string`, () => {
    it(`should return mockFormBody without _csrf and ${TOTAL_OUTSTANDING_PAYMENTS} set to "null"`, () => {
      mockFormBody[TOTAL_OUTSTANDING_PAYMENTS] = '';

      const result = mapSubmittedData(mockFormBody);

      const { _csrf, alternativeCurrencyCode, ...expectedBody } = mockFormBody;

      const expected = {
        ...expectedBody,
        [TOTAL_OUTSTANDING_PAYMENTS]: null,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${TOTAL_AMOUNT_OVERDUE} is set to an empty string`, () => {
    it(`should return mockFormBody without _csrf and ${TOTAL_AMOUNT_OVERDUE} set to "null"`, () => {
      mockFormBody[TOTAL_AMOUNT_OVERDUE] = '';

      const result = mapSubmittedData(mockFormBody);

      const { _csrf, alternativeCurrencyCode, ...expectedBody } = mockFormBody;

      const expected = {
        ...expectedBody,
        [TOTAL_AMOUNT_OVERDUE]: null,
      };

      expect(result).toEqual(expected);
    });
  });
});
