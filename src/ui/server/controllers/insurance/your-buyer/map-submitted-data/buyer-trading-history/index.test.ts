import mapSubmittedData from '.';
import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import { GBP, NON_STANDARD_CURRENCY_CODE } from '../../../../../constants';
import { RequestBody } from '../../../../../../types';

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

describe('controllers/insurance/your-buyer/map-submitted-data/buyer-trading-history', () => {
  let mockFormBody: RequestBody;

  beforeEach(() => {
    mockFormBody = {
      _csrf: 'abc',
      [CURRENCY_CODE]: GBP,
      [ALTERNATIVE_CURRENCY_CODE]: '',
      other: 'test',
    };
  });

  describe(`when ${CURRENCY_CODE} is not equal to ${ALTERNATIVE_CURRENCY_CODE}`, () => {
    it(`should return mockFormBody without _csrf and ${ALTERNATIVE_CURRENCY_CODE}`, () => {
      const response = mapSubmittedData(mockFormBody);

      const { _csrf, alternativeCurrencyCode, ...expectedBody } = mockFormBody;

      expect(response).toEqual(expectedBody);
    });
  });

  describe(`when ${CURRENCY_CODE} is equal to ${ALTERNATIVE_CURRENCY_CODE}`, () => {
    it(`should return mockFormBody without _csrf and ${ALTERNATIVE_CURRENCY_CODE} and ${CURRENCY_CODE} set to ${ALTERNATIVE_CURRENCY_CODE}'s value`, () => {
      mockFormBody[CURRENCY_CODE] = ALTERNATIVE_CURRENCY_CODE;
      mockFormBody[ALTERNATIVE_CURRENCY_CODE] = NON_STANDARD_CURRENCY_CODE;

      const response = mapSubmittedData(mockFormBody);

      const { _csrf, alternativeCurrencyCode, ...expectedBody } = mockFormBody;

      const expected = {
        ...expectedBody,
        [CURRENCY_CODE]: NON_STANDARD_CURRENCY_CODE,
      };

      expect(response).toEqual(expected);
    });
  });
});
