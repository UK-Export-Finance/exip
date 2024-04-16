import methodRule from '.';
import { MINIMUM_CHARACTERS } from '../../../../../../../constants';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import wholeNumberAboveMinimumValidation from '../../../../../../../shared-validation/whole-number-above-minimum';
import emptyFieldValidation from '../../../../../../../shared-validation/empty-field';
import { mockErrors } from '../../../../../../../test-mocks';

const {
  AGENT_CHARGES: { METHOD, FIXED_SUM, FIXED_SUM_AMOUNT },
} = FIELD_IDS;

const {
  AGENT_CHARGES: { [METHOD]: METHOD_ERROR_MESSAGES, [FIXED_SUM_AMOUNT]: FIXED_SUM_AMOUNT_ERROR_MESSAGES },
} = ERROR_MESSAGES.INSURANCE.EXPORT_CONTRACT;

describe('controllers/insurance/export-contract/agent-charges/validation/rules/method', () => {
  describe(`when ${METHOD} is ${FIXED_SUM}`, () => {
    it('should return the result of wholeNumberAboveMinimumValidation', () => {
      const mockBody = {
        [METHOD]: FIXED_SUM,
      };

      const result = methodRule(mockBody, mockErrors);

      const expected = wholeNumberAboveMinimumValidation(mockBody, FIXED_SUM_AMOUNT, FIXED_SUM_AMOUNT_ERROR_MESSAGES, mockErrors, MINIMUM_CHARACTERS.ONE);

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
