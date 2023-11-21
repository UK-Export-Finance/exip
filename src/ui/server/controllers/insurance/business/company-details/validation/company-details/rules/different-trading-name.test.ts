import brokerName from './different-trading-name';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/business';
import { RequestBody } from '../../../../../../../../types';
import emptyFieldValidation from '../../../../../../../shared-validation/empty-field';

const {
  YOUR_COMPANY: { DIFFERENT_TRADING_NAME: FIELD_ID, HAS_DIFFERENT_TRADING_NAME },
} = FIELD_IDS;

const {
  EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/business/company-details/validation/rules/different-trading-name', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  it(`should return the result of emptyFieldValidation if ${HAS_DIFFERENT_TRADING_NAME} is true`, () => {
    mockBody[HAS_DIFFERENT_TRADING_NAME] = 'true';

    const response = brokerName(mockBody, mockErrors);

    const expected = emptyFieldValidation(mockBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

    expect(response).toEqual(expected);
  });

  it(`should return the mockErrors if ${HAS_DIFFERENT_TRADING_NAME} is false`, () => {
    mockBody[HAS_DIFFERENT_TRADING_NAME] = 'false';

    const response = brokerName(mockBody, mockErrors);

    expect(response).toEqual(mockErrors);
  });

  it(`should return the mockErrors if ${HAS_DIFFERENT_TRADING_NAME} is "null"`, () => {
    mockBody[HAS_DIFFERENT_TRADING_NAME] = null;

    const response = brokerName(mockBody, mockErrors);

    expect(response).toEqual(mockErrors);
  });
});
