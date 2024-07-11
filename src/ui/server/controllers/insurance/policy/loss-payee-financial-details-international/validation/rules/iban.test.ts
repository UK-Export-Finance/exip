import ibanValidation from './iban';
import { MINIMUM_CHARACTERS, MAXIMUM_CHARACTERS } from '../../../../../../constants';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import generateValidationErrors from '../../../../../../helpers/validation';
import minAndMaxLengthValidation from '../../../../../../shared-validation/min-and-max-length';
import { mockErrors, mockLossPayeeFinancialDetailsInternational } from '../../../../../../test-mocks';

const { IBAN: FIELD_ID } = FIELD_IDS.LOSS_PAYEE_FINANCIAL_INTERNATIONAL;

const { [FIELD_ID]: ERROR_MESSAGES_OBJECT } = ERROR_MESSAGES.INSURANCE.POLICY;

describe('controllers/insurance/policy/loss-payee-financial-details-international/validation/rules/iban', () => {
  describe('when a value is not provided', () => {
    it('should return generateValidationErrors', () => {
      const mockBody = {};

      const result = ibanValidation(mockBody, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGES_OBJECT.IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  it('should otherwise return minAndMaxLengthValidation', () => {
    const mockBody = {
      [FIELD_ID]: mockLossPayeeFinancialDetailsInternational[FIELD_ID],
    };

    const result = ibanValidation(mockBody, mockErrors);

    const expected = minAndMaxLengthValidation({
      fieldId: FIELD_ID,
      value: mockBody[FIELD_ID],
      errorMessages: ERROR_MESSAGES_OBJECT,
      errors: mockErrors,
      minimum: MINIMUM_CHARACTERS.IBAN,
      maximum: MAXIMUM_CHARACTERS.IBAN,
    });

    expect(result).toEqual(expected);
  });
});
