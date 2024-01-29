import alternativeCurrencyValidation from '.';
import INSURANCE_FIELD_IDS from '../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../content-strings';
import emptyFieldValidation from '../empty-field';
import { RequestBody } from '../../../types';

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    EXPORTER_BUSINESS: { [ALTERNATIVE_CURRENCY_CODE]: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES;

describe('shared-validation/alternative-currency', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [CURRENCY_CODE]: ALTERNATIVE_CURRENCY_CODE,
    [ALTERNATIVE_CURRENCY_CODE]: '',
  } as RequestBody;

  describe(`when ${CURRENCY_CODE} equals ${ALTERNATIVE_CURRENCY_CODE}`, () => {
    describe(`when ${ALTERNATIVE_CURRENCY_CODE} is not provided`, () => {
      it('should return emptyFieldValidation', () => {
        const result = alternativeCurrencyValidation(mockBody, mockErrors, ERROR_MESSAGE.IS_EMPTY);

        const expected = emptyFieldValidation(mockBody, ALTERNATIVE_CURRENCY_CODE, ERROR_MESSAGE.IS_EMPTY, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${ALTERNATIVE_CURRENCY_CODE} is provided`, () => {
      it('should return the provided errors', () => {
        mockBody[ALTERNATIVE_CURRENCY_CODE] = 'Mock currency code';

        const result = alternativeCurrencyValidation(mockBody, mockErrors, ERROR_MESSAGE.IS_EMPTY);

        expect(result).toEqual(mockErrors);
      });
    });
  });
});
