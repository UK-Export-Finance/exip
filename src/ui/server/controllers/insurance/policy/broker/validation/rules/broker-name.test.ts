import brokerName from './broker-name';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/policy';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../../types';
import { mockErrors } from '../../../../../../test-mocks';

const {
  BROKER: { NAME, USING_BROKER },
} = FIELD_IDS;

const { POLICY } = ERROR_MESSAGES.INSURANCE;
const ERROR_MESSAGE = POLICY[NAME];

describe('controllers/insurance/policy/broker/validation/rules/broker-name', () => {
  const mockBody = {
    [NAME]: '',
  } as RequestBody;

  it('should return the result of emptyFieldValidation if using broker is true', () => {
    mockBody[USING_BROKER] = true;

    const response = brokerName(mockBody, mockErrors);

    const expected = emptyFieldValidation(mockBody, NAME, ERROR_MESSAGE.IS_EMPTY, mockErrors);

    expect(response).toEqual(expected);
  });

  it('should return the mockErrors if using broker is false', () => {
    mockBody[USING_BROKER] = false;

    const response = brokerName(mockBody, mockErrors);

    expect(response).toEqual(mockErrors);
  });

  it('should return the mockErrors if using broker is "null"', () => {
    mockBody[USING_BROKER] = null;

    const response = brokerName(mockBody, mockErrors);

    expect(response).toEqual(mockErrors);
  });
});
