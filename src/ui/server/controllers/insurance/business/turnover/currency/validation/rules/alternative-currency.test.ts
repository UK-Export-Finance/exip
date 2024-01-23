import alternativeCurrencyRule from './alternative-currency';
import INSURANCE_FIELD_IDS from '../../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../../../types';

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    EXPORTER_BUSINESS: { [ALTERNATIVE_CURRENCY_CODE]: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/business/turnover/currency/validation/rules/alternative-currency', () => {
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
        const result = alternativeCurrencyRule(mockBody, mockErrors);

        const expected = emptyFieldValidation(mockBody, ALTERNATIVE_CURRENCY_CODE, ERROR_MESSAGE.IS_EMPTY, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${ALTERNATIVE_CURRENCY_CODE} is provided`, () => {
      it('should return the provided errors', () => {
        mockBody[ALTERNATIVE_CURRENCY_CODE] = 'Mock currency code';

        const result = alternativeCurrencyRule(mockBody, mockErrors);

        expect(result).toEqual(mockErrors);
      });
    });
  });
});
