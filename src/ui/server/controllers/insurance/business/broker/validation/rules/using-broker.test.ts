import usingBroker from './using-broker';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/business';
import { RequestBody } from '../../../../../../../types';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';

const {
  BROKER: { USING_BROKER: FIELD_ID },
} = FIELD_IDS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;
const ERROR_MESSAGE = EXPORTER_BUSINESS[FIELD_ID];

describe('controllers/insurance/business/broker/validation/rules/using-broker', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  describe('when the answer is false', () => {
    it('should return the provided errors', () => {
      const mockBodyFalseAnswer = {
        [FIELD_ID]: false,
      };

      const response = usingBroker(mockBodyFalseAnswer, mockErrors);

      expect(response).toEqual(mockErrors);
    });
  });

  it('should return the result of emptyFieldValidation', () => {
    const response = usingBroker(mockBody, mockErrors);

    const expected = emptyFieldValidation(mockBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

    expect(response).toEqual(expected);
  });
});
