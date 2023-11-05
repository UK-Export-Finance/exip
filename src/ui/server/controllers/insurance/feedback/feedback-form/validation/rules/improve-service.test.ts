import improveService, { MAXIMUM } from './improve-service';
import { FIELD_IDS } from '../../../../../../constants';
import { RequestBody } from '../../../../../../../types';
import inputValidation from '../../../../../../shared-validation/max-length';
import { ERROR_MESSAGES } from '../../../../../../content-strings';

const {
  FEEDBACK: { IMPROVEMENT: FIELD_ID },
} = FIELD_IDS;

const { [FIELD_ID]: ERROR_MESSAGE } = ERROR_MESSAGES;

describe('controllers/insurance/feedback/feedback-form/validation/rules/improve-service', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  describe(`when the ${FIELD_ID} input is over ${MAXIMUM} characters`, () => {
    it('should return the result of "inputValidation"', () => {
      const mockValue = Number(MAXIMUM) + 1;

      mockBody[FIELD_ID] = 'a'.repeat(mockValue);
      const response = improveService(mockBody, mockErrors);

      const expected = inputValidation(mockBody[FIELD_ID], FIELD_ID, ERROR_MESSAGE, mockErrors, MAXIMUM);

      expect(response).toEqual(expected);
    });
  });
});
