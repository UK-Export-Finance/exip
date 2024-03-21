import creditPeriodWithBuyerRule, { MAXIMUM } from './credit-period-with-buyer-description';
import INSURANCE_FIELD_IDS from '../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import generateValidationErrors from '../../../../../../helpers/validation';
import maxLengthValidation from '../../../../../../shared-validation/max-length';
import { mockErrors } from '../../../../../../test-mocks';

const {
  POLICY: { NEED_PRE_CREDIT_PERIOD, CREDIT_PERIOD_WITH_BUYER: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: { [FIELD_ID]: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/policy/pre-credit-period/validation/rules/credit-period-with-buyer-description', () => {
  describe(`when ${NEED_PRE_CREDIT_PERIOD} is true and ${FIELD_ID} is not provided`, () => {
    it('should return a validation errors', () => {
      const mockFormBody = {
        [NEED_PRE_CREDIT_PERIOD]: 'true',
        [FIELD_ID]: '',
      };

      const result = creditPeriodWithBuyerRule(mockFormBody, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${NEED_PRE_CREDIT_PERIOD} is true and ${FIELD_ID} is over ${MAXIMUM} characters`, () => {
    it('should return the result of inputValidation', () => {
      const mockFormBody = {
        [NEED_PRE_CREDIT_PERIOD]: 'true',
        [FIELD_ID]: 'a'.repeat(MAXIMUM + 1),
      };

      const result = creditPeriodWithBuyerRule(mockFormBody, mockErrors);

      const expected = maxLengthValidation(mockFormBody[FIELD_ID], FIELD_ID, ERROR_MESSAGE.ABOVE_MAXIMUM, mockErrors, MAXIMUM);

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${NEED_PRE_CREDIT_PERIOD} is true and ${FIELD_ID} is NOT over ${MAXIMUM} characters`, () => {
    it('should return the provided errors', () => {
      const mockFormBody = {
        [NEED_PRE_CREDIT_PERIOD]: 'true',
        [FIELD_ID]: 'mock description',
      };

      const result = creditPeriodWithBuyerRule(mockFormBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });

  describe(`when ${NEED_PRE_CREDIT_PERIOD} is false`, () => {
    it('should return the provided errors', () => {
      const mockFormBody = {
        [NEED_PRE_CREDIT_PERIOD]: 'false',
      };

      const result = creditPeriodWithBuyerRule(mockFormBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
