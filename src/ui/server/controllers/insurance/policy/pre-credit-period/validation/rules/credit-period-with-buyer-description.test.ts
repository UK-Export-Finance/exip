import creditPeriodWithBuyerRule from './credit-period-with-buyer-description';
import { MAXIMUM_CHARACTERS } from '../../../../../../constants';
import INSURANCE_FIELD_IDS from '../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import providedAndMaxLength from '../../../../../../shared-validation/provided-and-max-length';
import { mockErrors } from '../../../../../../test-mocks';

const {
  POLICY: { NEED_PRE_CREDIT_PERIOD, CREDIT_PERIOD_WITH_BUYER: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/policy/pre-credit-period/validation/rules/credit-period-with-buyer-description', () => {
  describe(`when ${NEED_PRE_CREDIT_PERIOD} is true`, () => {
    it('should return the result of providedAndMaxLength', () => {
      const mockFormBody = {
        [NEED_PRE_CREDIT_PERIOD]: 'true',
        [FIELD_ID]: 'a'.repeat(MAXIMUM_CHARACTERS.CREDIT_PERIOD_WITH_BUYER + 1),
      };

      const result = creditPeriodWithBuyerRule(mockFormBody, mockErrors);

      const expected = providedAndMaxLength(mockFormBody, FIELD_ID, ERROR_MESSAGES_OBJECT, mockErrors, MAXIMUM_CHARACTERS.CREDIT_PERIOD_WITH_BUYER);

      expect(result).toEqual(expected);
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
