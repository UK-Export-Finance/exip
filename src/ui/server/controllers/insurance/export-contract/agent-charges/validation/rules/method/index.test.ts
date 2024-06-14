import methodRule from '.';
import { FIELD_VALUES, MINIMUM_CHARACTERS } from '../../../../../../../constants';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import numberAboveMinimumValidation from '../../../../../../../shared-validation/number-above-minimum';
import percentageNumberValidation from '../../../../../../../helpers/percentage-number-validation';
import emptyFieldValidation from '../../../../../../../shared-validation/empty-field';
import { mockErrors } from '../../../../../../../test-mocks';

const {
  EXPORT_CONTRACT: {
    AGENT_SERVICE_CHARGE_METHOD: { FIXED_SUM, PERCENTAGE },
  },
} = FIELD_VALUES;

const {
  AGENT_CHARGES: { METHOD, FIXED_SUM_AMOUNT, PERCENTAGE_CHARGE },
} = FIELD_IDS;

const {
  AGENT_CHARGES: {
    [METHOD]: METHOD_ERROR_MESSAGES,
    [FIXED_SUM_AMOUNT]: FIXED_SUM_AMOUNT_ERROR_MESSAGES,
    [PERCENTAGE_CHARGE]: PERCENTAGE_CHARGE_ERROR_MESSAGES,
  },
} = ERROR_MESSAGES.INSURANCE.EXPORT_CONTRACT;

describe('controllers/insurance/export-contract/agent-charges/validation/rules/method', () => {
  describe(`when ${METHOD} is ${FIXED_SUM}`, () => {
    it('should return the result of numberAboveMinimumValidation', () => {
      const mockBody = {
        [METHOD]: FIXED_SUM,
      };

      const result = methodRule(mockBody, mockErrors);

      const expected = numberAboveMinimumValidation({
        formBody: mockBody,
        fieldId: FIXED_SUM_AMOUNT,
        errorMessage: FIXED_SUM_AMOUNT_ERROR_MESSAGES,
        errors: mockErrors,
        minimum: MINIMUM_CHARACTERS.ONE,
        allowDecimalPlaces: true,
      });

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${METHOD} is ${PERCENTAGE}`, () => {
    it('should return the result of percentageNumberValidation', () => {
      const mockBody = {
        [METHOD]: PERCENTAGE,
      };

      const result = methodRule(mockBody, mockErrors);

      const expected = percentageNumberValidation(mockBody, PERCENTAGE_CHARGE, mockErrors, PERCENTAGE_CHARGE_ERROR_MESSAGES);

      expect(result).toEqual(expected);
    });
  });

  it('should return the result of emptyFieldValidation', () => {
    const mockBody = {};

    const result = methodRule(mockBody, mockErrors);

    const expected = emptyFieldValidation(mockBody, METHOD, METHOD_ERROR_MESSAGES.IS_EMPTY, mockErrors);

    expect(result).toEqual(expected);
  });
});
