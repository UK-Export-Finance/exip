import otherComments from './other-comments';
import { FIELD_IDS, MAXIMUM_CHARACTERS } from '../../../../../../constants';
import { RequestBody } from '../../../../../../../types';
import maxLengthValidation from '../../../../../../shared-validation/max-length';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { mockErrors } from '../../../../../../test-mocks';

const {
  FEEDBACK: { OTHER_COMMENTS: FIELD_ID },
} = FIELD_IDS;

const { [FIELD_ID]: ERROR_MESSAGE } = ERROR_MESSAGES;

describe('controllers/insurance/feedback/feedback-form/validation/rules/other-comments', () => {
  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  describe(`when the ${FIELD_ID} input is over ${MAXIMUM_CHARACTERS.FEEDBACK.OTHER_COMMENTS} characters`, () => {
    it('should return the result of "inputValidation"', () => {
      const mockValue = Number(MAXIMUM_CHARACTERS.FEEDBACK.OTHER_COMMENTS) + 1;

      mockBody[FIELD_ID] = 'a'.repeat(mockValue);
      const response = otherComments(mockBody, mockErrors);

      const expected = maxLengthValidation(mockBody[FIELD_ID], FIELD_ID, ERROR_MESSAGE, mockErrors, MAXIMUM_CHARACTERS.FEEDBACK.OTHER_COMMENTS);

      expect(response).toEqual(expected);
    });
  });
});
