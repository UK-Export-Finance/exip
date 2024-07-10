import percentageOfCoverRules from './percentage-of-cover';
import { FIELD_IDS } from '../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import emptyFieldValidation from '../../../../../shared-validation/empty-field';
import { mockErrors } from '../../../../../test-mocks';

const {
  ELIGIBILITY: { PERCENTAGE_OF_COVER: FIELD_ID },
} = FIELD_IDS;

const ERROR_MESSAGE = ERROR_MESSAGES.ELIGIBILITY[FIELD_ID];

describe('controllers/quote/tell-us-about-your-policy/validation/rules/percentage-of-cover', () => {
  const mockBody = {
    [FIELD_ID]: '',
  };

  it('should return the result of emptyFieldValidation', () => {
    const result = percentageOfCoverRules(mockBody, mockErrors);

    const expected = emptyFieldValidation(mockBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

    expect(result).toEqual(expected);
  });
});
