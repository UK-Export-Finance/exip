import brokerAddressLineOne from './broker-address-line-one';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/policy';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../../types';
import { mockErrors } from '../../../../../../test-mocks';

const {
  BROKER: { ADDRESS_LINE_1, USING_BROKER },
} = FIELD_IDS;

const { POLICY } = ERROR_MESSAGES.INSURANCE;
const ERROR_MESSAGE = POLICY[ADDRESS_LINE_1];

describe('controllers/insurance/policy/broker/validation/rules/broker-address-line-one', () => {
  const mockBody = {
    [ADDRESS_LINE_1]: '',
  } as RequestBody;

  it('should return the result of emptyFieldValidation if using broker is true', () => {
    mockBody[USING_BROKER] = true;

    const response = brokerAddressLineOne(mockBody, mockErrors);

    const expected = emptyFieldValidation(mockBody, ADDRESS_LINE_1, ERROR_MESSAGE.IS_EMPTY, mockErrors);

    expect(response).toEqual(expected);
  });

  it('should return the mockErrors if using broker is false', () => {
    mockBody[USING_BROKER] = false;

    const response = brokerAddressLineOne(mockBody, mockErrors);

    expect(response).toEqual(mockErrors);
  });

  it('should return the mockErrors if using broker is "null"', () => {
    mockBody[USING_BROKER] = null;

    const response = brokerAddressLineOne(mockBody, mockErrors);

    expect(response).toEqual(mockErrors);
  });
});
