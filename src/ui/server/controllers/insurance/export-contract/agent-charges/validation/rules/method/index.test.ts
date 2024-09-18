import methodRule from '.';
import { FIELD_VALUES } from '../../../../../../../constants';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import percentageNumberValidation from '../../../../../../../helpers/percentage-number-validation';
import emptyFieldValidation from '../../../../../../../shared-validation/empty-field';
import { mockErrors } from '../../../../../../../test-mocks';

const {
  EXPORT_CONTRACT: {
    AGENT_SERVICE_CHARGE_METHOD: { PERCENTAGE },
  },
} = FIELD_VALUES;

const {
  AGENT_CHARGES: { METHOD, PERCENTAGE_CHARGE },
} = FIELD_IDS;

const {
  AGENT_CHARGES: { [METHOD]: METHOD_ERROR_MESSAGES, [PERCENTAGE_CHARGE]: PERCENTAGE_CHARGE_ERROR_MESSAGES },
} = ERROR_MESSAGES.INSURANCE.EXPORT_CONTRACT;

describe('controllers/insurance/export-contract/agent-charges/validation/rules/method', () => {
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
