import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import mapCurrencyCodeFormData from '.';
import { GBP, HKD } from '../../../test-mocks';

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

const mockCurrencyFieldId = 'mockId';

describe('helpers/mappings/map-currency-code-form-data', () => {
  describe(`when ${CURRENCY_CODE} is in the body and a custom field ID is NOT provided`, () => {
    it(`should return a default ${CURRENCY_CODE}`, () => {
      const mockBody = {
        [CURRENCY_CODE]: GBP.isoCode,
        [ALTERNATIVE_CURRENCY_CODE]: '',
      };

      const result = mapCurrencyCodeFormData(mockBody);

      const expected = {
        [CURRENCY_CODE]: mockBody[CURRENCY_CODE],
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when a custom field ID is provided', () => {
    it(`should return ${mockCurrencyFieldId} mapped to ${CURRENCY_CODE}`, () => {
      const mockBody = {
        [CURRENCY_CODE]: GBP.isoCode,
      };

      const result = mapCurrencyCodeFormData(mockBody, mockCurrencyFieldId);

      const expected = {
        [CURRENCY_CODE]: GBP.isoCode,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${CURRENCY_CODE} equals ${ALTERNATIVE_CURRENCY_CODE}`, () => {
    it(`should return ${mockCurrencyFieldId} as ${ALTERNATIVE_CURRENCY_CODE}`, () => {
      const alternativeCurrencyCode = HKD.isoCode;

      const mockBody = {
        [mockCurrencyFieldId]: ALTERNATIVE_CURRENCY_CODE,
        [ALTERNATIVE_CURRENCY_CODE]: alternativeCurrencyCode,
      };

      const result = mapCurrencyCodeFormData(mockBody, mockCurrencyFieldId);

      const expected = {
        [mockCurrencyFieldId]: alternativeCurrencyCode,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when no currency fields exist', () => {
    it('should return the provided body', () => {
      const mockBody = {};

      const result = mapCurrencyCodeFormData(mockBody, mockCurrencyFieldId);

      const expected = mockBody;

      expect(result).toEqual(expected);
    });
  });
});
