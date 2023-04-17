import brokerAddressLineOne from './broker-address-line-one';
import { FIELD_VALUES } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/exporter-business';
import { RequestBody } from '../../../../../../../types';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';

const {
  BROKER: { ADDRESS_LINE_1, USING_BROKER },
} = FIELD_IDS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;
const ERROR_MESSAGE = EXPORTER_BUSINESS[ADDRESS_LINE_1];

describe('controllers/insurance/business/broker/validation/rules/broker-address-line-one', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [ADDRESS_LINE_1]: '',
  } as RequestBody;

  it(`should return the result of emptyFieldValidation if using broker is "${FIELD_VALUES.YES}"`, () => {
    mockBody[USING_BROKER] = FIELD_VALUES.YES;

    const response = brokerAddressLineOne(mockBody, mockErrors);

    const expected = emptyFieldValidation(mockBody, ADDRESS_LINE_1, ERROR_MESSAGE.IS_EMPTY, mockErrors);

    expect(response).toEqual(expected);
  });

  it(`should return the mockErrors if using broker is "${FIELD_VALUES.NO}"`, () => {
    mockBody[USING_BROKER] = FIELD_VALUES.NO;

    const response = brokerAddressLineOne(mockBody, mockErrors);

    expect(response).toEqual(mockErrors);
  });

  it('should return the mockErrors if using broker is "null"', () => {
    mockBody[USING_BROKER] = null;

    const response = brokerAddressLineOne(mockBody, mockErrors);

    expect(response).toEqual(mockErrors);
  });
});
