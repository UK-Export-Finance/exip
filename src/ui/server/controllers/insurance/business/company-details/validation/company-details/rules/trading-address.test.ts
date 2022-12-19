import tradingAddress from './trading-address';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../../constants';
import generateValidationErrors from '../../../../../../../helpers/validation';
import { RequestBody } from '../../../../../../../../types';

const {
  YOUR_COMPANY: { TRADING_ADDRESS },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;

const errorMessage = EXPORTER_BUSINESS[TRADING_ADDRESS].IS_EMPTY;

describe('controllers/insurance/business/company-details/validation/company-details/rules/tradingAddress', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [TRADING_ADDRESS]: '',
  } as RequestBody;

  it(`should return a validation error when ${TRADING_ADDRESS} is an empty string`, () => {
    const result = tradingAddress(mockBody, mockErrors);

    const expected = generateValidationErrors(TRADING_ADDRESS, errorMessage, mockErrors);

    expect(result).toEqual(expected);
  });

  it('should return a validation error when tradingAddress is null string', () => {
    mockBody[TRADING_ADDRESS] = null;

    const result = tradingAddress(mockBody, mockErrors);

    const expected = generateValidationErrors(TRADING_ADDRESS, errorMessage, mockErrors);

    expect(result).toEqual(expected);
  });

  it(`should return a validation error when ${TRADING_ADDRESS} is not in the body`, () => {
    delete mockBody[TRADING_ADDRESS];

    const result = tradingAddress(mockBody, mockErrors);

    const expected = generateValidationErrors(TRADING_ADDRESS, errorMessage, mockErrors);

    expect(result).toEqual(expected);
  });

  it(`should not return a validation error when ${TRADING_ADDRESS} is yes`, () => {
    mockBody[TRADING_ADDRESS] = 'yes';

    const result = tradingAddress(mockBody, mockErrors);

    expect(result).toEqual(mockErrors);
  });

  it(`should not return a validation error when ${TRADING_ADDRESS} is no`, () => {
    mockBody[TRADING_ADDRESS] = 'no';

    const result = tradingAddress(mockBody, mockErrors);

    expect(result).toEqual(mockErrors);
  });
});
