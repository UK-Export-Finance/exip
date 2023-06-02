import brokerTown from './broker-town';
import { FIELD_VALUES } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/business';
import { RequestBody } from '../../../../../../../types';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';

const {
  BROKER: { TOWN, USING_BROKER },
} = FIELD_IDS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;
const ERROR_MESSAGE = EXPORTER_BUSINESS[TOWN];

describe('controllers/insurance/business/broker/validation/rules/brokerTown', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [TOWN]: '',
  } as RequestBody;

  it('should return the result of emptyFieldValidation', () => {
    mockBody[USING_BROKER] = FIELD_VALUES.YES;

    const response = brokerTown(mockBody, mockErrors);

    const expected = emptyFieldValidation(mockBody, TOWN, ERROR_MESSAGE.IS_EMPTY, mockErrors);

    expect(response).toEqual(expected);
  });

  it(`should return the mockErrors if using broker is "${FIELD_VALUES.NO}"`, () => {
    mockBody[USING_BROKER] = FIELD_VALUES.NO;

    const response = brokerTown(mockBody, mockErrors);

    expect(response).toEqual(mockErrors);
  });

  it('should return the mockErrors if using broker is "null"', () => {
    mockBody[USING_BROKER] = null;

    const response = brokerTown(mockBody, mockErrors);

    expect(response).toEqual(mockErrors);
  });
});
