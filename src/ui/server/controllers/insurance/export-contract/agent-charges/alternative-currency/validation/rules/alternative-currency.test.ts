import alternativeCurrencyRule from './alternative-currency';
import INSURANCE_FIELD_IDS from '../../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import alternativeCurrencyValidation from '../../../../../../../shared-validation/alternative-currency';
import { mockErrors } from '../../../../../../../test-mocks';

const {
  CURRENCY: { ALTERNATIVE_CURRENCY_CODE: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: {
      AGENT_CHARGES_ALTERNATIVE_CURRENCY: { [FIELD_ID]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/export-contract/agent-charges/alternative-currency/validation/rules/alternative-currency', () => {
  const mockBody = {};

  it('should return alternativeCurrencyValidation', () => {
    const result = alternativeCurrencyRule(mockBody, mockErrors);

    const expected = alternativeCurrencyValidation(mockBody, mockErrors, ERROR_MESSAGE.IS_EMPTY);

    expect(result).toEqual(expected);
  });
});
