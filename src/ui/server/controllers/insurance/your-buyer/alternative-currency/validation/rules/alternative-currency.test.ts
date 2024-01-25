import alternativeCurrencyRule from './alternative-currency';
import INSURANCE_FIELD_IDS from '../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { RequestBody } from '../../../../../../../types';
import alternativeCurrencyValidation from '../../../../../../shared-validation/alternative-currency.ts';

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { [ALTERNATIVE_CURRENCY_CODE]: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/your-buyer/alternative-currency/validation/rules/alternative-currency', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [CURRENCY_CODE]: ALTERNATIVE_CURRENCY_CODE,
    [ALTERNATIVE_CURRENCY_CODE]: '',
  } as RequestBody;

  it('should return alternativeCurrencyValidation', () => {
    const result = alternativeCurrencyRule(mockBody, mockErrors);

    const expected = alternativeCurrencyValidation(mockBody, mockErrors, ERROR_MESSAGE.IS_EMPTY);

    expect(result).toEqual(expected);
  });
});
