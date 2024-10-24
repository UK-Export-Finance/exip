import improveService from './improve-service';
import { FIELD_IDS, MAXIMUM_CHARACTERS } from '../../../../../../constants';
import maxLengthValidation from '../../../../../../shared-validation/max-length';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { RequestBody } from '../../../../../../../types';
import { mockErrors } from '../../../../../../test-mocks';

const {
  FEEDBACK: { IMPROVEMENT: FIELD_ID },
} = FIELD_IDS;

const { [FIELD_ID]: ERROR_MESSAGE } = ERROR_MESSAGES;

describe('controllers/insurance/feedback/feedback-form/validation/rules/improve-service', () => {
  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  describe(`when the ${FIELD_ID} input is over ${MAXIMUM_CHARACTERS.FEEDBACK.IMPROVEMENT} characters`, () => {
    it('should return the result of maxLengthValidation', () => {
      const mockValue = Number(MAXIMUM_CHARACTERS.FEEDBACK.IMPROVEMENT) + 1;

      mockBody[FIELD_ID] = 'a'.repeat(mockValue);
      const response = improveService(mockBody, mockErrors);

      const expected = maxLengthValidation(mockBody[FIELD_ID], FIELD_ID, ERROR_MESSAGE, mockErrors, MAXIMUM_CHARACTERS.FEEDBACK.IMPROVEMENT);

      expect(response).toEqual(expected);
    });
  });
});
