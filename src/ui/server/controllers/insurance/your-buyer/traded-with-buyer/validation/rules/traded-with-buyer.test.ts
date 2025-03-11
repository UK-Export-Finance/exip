import tradedWithBuyerRule from './traded-with-buyer';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/your-buyer';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../../types';
import { mockErrors } from '../../../../../../test-mocks';

const { TRADED_WITH_BUYER: FIELD_ID } = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { [FIELD_ID]: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/your-buyer/traded-with-buyer/validation/rules/traded-with-buyer', () => {
  const mockBody: RequestBody = {
    [FIELD_ID]: '',
  };

  it('should return `emptyFieldValidation`', () => {
    const result = tradedWithBuyerRule(mockBody, mockErrors);

    const expected = emptyFieldValidation(mockBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

    expect(result).toEqual(expected);
  });
});
