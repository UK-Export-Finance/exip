import alternativeCurrencyRule from './currency';
import INSURANCE_FIELD_IDS from '../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../../types';
import { mockErrors } from '../../../../../../test-mocks';

const {
  CURRENCY: { CURRENCY_CODE: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: {
      AGENT_CHARGES_CURRENCY: { [FIELD_ID]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/export-contract/currency-of-agents-charge/validation/rules/currency', () => {
  const mockBody: RequestBody = {
    [FIELD_ID]: '',
  };

  it('should return `emptyFieldValidation`', () => {
    const result = alternativeCurrencyRule(mockBody, mockErrors);

    const expected = emptyFieldValidation(mockBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

    expect(result).toEqual(expected);
  });
});
