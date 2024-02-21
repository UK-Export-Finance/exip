import improveService, { MAXIMUM } from './registration-number';
import BUYER_FIELD_IDS from '../../../../../../constants/field-ids/insurance/your-buyer';
import maxLengthValidation from '../../../../../../shared-validation/max-length';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { mockErrors } from '../../../../../../test-mocks';
import { RequestBody } from '../../../../../../../types';

const {
  COMPANY_OR_ORGANISATION: { REGISTRATION_NUMBER: FIELD_ID },
} = BUYER_FIELD_IDS;

const {
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION: {
      [FIELD_ID]: { ABOVE_MAXIMUM: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/your-buyer/company-or-organisation/validation/rules/registration-number', () => {
  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  describe(`when the ${FIELD_ID} input is over ${MAXIMUM} characters`, () => {
    it('should return the result of "maxLengthValidation"', () => {
      const mockValue = Number(MAXIMUM) + 1;

      mockBody[FIELD_ID] = 'a'.repeat(mockValue);
      const response = improveService(mockBody, mockErrors);

      const expected = maxLengthValidation(mockBody[FIELD_ID], FIELD_ID, ERROR_MESSAGE, mockErrors, MAXIMUM);

      expect(response).toEqual(expected);
    });
  });
});
