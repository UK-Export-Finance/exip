import policyAlternativeCurrencyCodeRules from '.';
import INSURANCE_FIELD_IDS from '../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../content-strings';
import emptyFieldValidation from '../empty-field';
import { mockErrors } from '../../test-mocks';

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: { [ALTERNATIVE_CURRENCY_CODE]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES;

describe('shared-validation/policy-alternative-currency-code', () => {
  const mockBody = {
    [CURRENCY_CODE]: ALTERNATIVE_CURRENCY_CODE,
    [ALTERNATIVE_CURRENCY_CODE]: '',
  };

  describe(`when ${CURRENCY_CODE} equals ${ALTERNATIVE_CURRENCY_CODE}`, () => {
    describe(`when ${ALTERNATIVE_CURRENCY_CODE} is not provided`, () => {
      it('should return emptyFieldValidation', () => {
        const result = policyAlternativeCurrencyCodeRules(mockBody, mockErrors);

        const expected = emptyFieldValidation(mockBody, ALTERNATIVE_CURRENCY_CODE, ERROR_MESSAGE.IS_EMPTY, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${ALTERNATIVE_CURRENCY_CODE} is provided`, () => {
      it('should return the provided errors', () => {
        mockBody[ALTERNATIVE_CURRENCY_CODE] = 'Mock currency code';

        const result = policyAlternativeCurrencyCodeRules(mockBody, mockErrors);

        expect(result).toEqual(mockErrors);
      });
    });
  });
});
