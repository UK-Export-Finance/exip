import creditInsuranceCoverDescriptionRule from './credit-insurance-cover-description';
import { MAXIMUM_CHARACTERS } from '../../../../../../constants';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/your-buyer';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import providedAndMaxLength from '../../../../../../shared-validation/provided-and-max-length';
import { RequestBody } from '../../../../../../../types';
import { mockErrors } from '../../../../../../test-mocks';

const { PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER: FIELD_ID, HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER } = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/your-buyer/credit-insurance-cover/validation/rules/credit-insurance-cover-description', () => {
  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  describe(`${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} is true`, () => {
    it('should return the result of providedAndMaxLength', () => {
      mockBody[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER] = 'true';

      const response = creditInsuranceCoverDescriptionRule(mockBody, mockErrors);

      const expected = providedAndMaxLength(mockBody, FIELD_ID, ERROR_MESSAGES_OBJECT, mockErrors, MAXIMUM_CHARACTERS.BUYER.PREVIOUS_CREDIT_INSURANCE_COVER);

      expect(response).toEqual(expected);
    });
  });

  describe(`${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} is false`, () => {
    it('should return the return the provided errors', () => {
      mockBody[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER] = 'false';

      const result = creditInsuranceCoverDescriptionRule(mockBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
