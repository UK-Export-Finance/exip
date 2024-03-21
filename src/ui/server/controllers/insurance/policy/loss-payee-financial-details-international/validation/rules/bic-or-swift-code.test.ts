import bicSwiftCodeValidation from './bic-or-swift-code';
import { MINIMUM_CHARACTERS, MAXIMUM_CHARACTERS } from '../../../../../../constants';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import generateValidationErrors from '../../../../../../helpers/validation';
import alphaNumericalCharactersOnlyValidation from '../../../../../../shared-validation/alpha-numerical-characters-only';
import minAndMaxLengthValidation from '../../../../../../shared-validation/min-and-max-length';
import { mockErrors, mockLossPayeeFinancialDetailsInternational } from '../../../../../../test-mocks';

const { BIC_SWIFT_CODE: FIELD_ID } = FIELD_IDS.LOSS_PAYEE_FINANCIAL_INTERNATIONAL;

const { [FIELD_ID]: ERROR_MESSAGES_OBJECT } = ERROR_MESSAGES.INSURANCE.POLICY;

describe('controllers/insurance/policy/loss-payee-financial-details-international/validation/rules/bic-or-swift-code', () => {
  describe('when a value is not provided', () => {
    it('should return generateValidationErrors', () => {
      const mockBody = {};

      const result = bicSwiftCodeValidation(mockBody, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGES_OBJECT.IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when a value contains non alpha numerical characters', () => {
    it('should return alphaNumericalCharactersOnlyValidation', () => {
      const mockBody = {
        [FIELD_ID]: '!',
      };

      const result = bicSwiftCodeValidation(mockBody, mockErrors);

      const expected = alphaNumericalCharactersOnlyValidation(mockBody[FIELD_ID], FIELD_ID, ERROR_MESSAGES_OBJECT.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  it('should otherwise return minAndMaxLengthValidation', () => {
    const mockBody = {
      [FIELD_ID]: mockLossPayeeFinancialDetailsInternational[FIELD_ID],
    };

    const result = bicSwiftCodeValidation(mockBody, mockErrors);

    const expected = minAndMaxLengthValidation({
      fieldId: FIELD_ID,
      value: mockBody[FIELD_ID],
      errorMessages: ERROR_MESSAGES_OBJECT,
      errors: mockErrors,
      minimum: MINIMUM_CHARACTERS.BIC_SWIFT_CODE,
      maximum: MAXIMUM_CHARACTERS.BIC_SWIFT_CODE,
    });

    expect(result).toEqual(expected);
  });
});
