import brokerTown from './broker-town';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/policy';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';
import { mockErrors } from '../../../../../../test-mocks';
import { RequestBody } from '../../../../../../../types';

const {
  BROKER: { TOWN, USING_BROKER },
} = FIELD_IDS;

const { POLICY } = ERROR_MESSAGES.INSURANCE;
const ERROR_MESSAGE = POLICY[TOWN];

describe('controllers/insurance/policy/broker/validation/rules/brokerTown', () => {
  const mockBody = {
    [TOWN]: '',
  } as RequestBody;

  it('should return the result of emptyFieldValidation', () => {
    mockBody[USING_BROKER] = true;

    const response = brokerTown(mockBody, mockErrors);

    const expected = emptyFieldValidation(mockBody, TOWN, ERROR_MESSAGE.IS_EMPTY, mockErrors);

    expect(response).toEqual(expected);
  });

  it('should return the mockErrors if using broker is false', () => {
    mockBody[USING_BROKER] = false;

    const response = brokerTown(mockBody, mockErrors);

    expect(response).toEqual(mockErrors);
  });

  it('should return the mockErrors if using broker is "null"', () => {
    mockBody[USING_BROKER] = null;

    const response = brokerTown(mockBody, mockErrors);

    expect(response).toEqual(mockErrors);
  });
});
