import tradingName from './trading-name';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../../constants';
import generateValidationErrors from '../../../../../../../helpers/validation';
import { RequestBody } from '../../../../../../../../types';

const {
  YOUR_COMPANY: { TRADING_NAME },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;

const errorMessage = EXPORTER_BUSINESS[TRADING_NAME].IS_EMPTY;

describe('controllers/insurance/business/company-details/validation/company-details/rules/tradingName', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [TRADING_NAME]: '',
  } as RequestBody;

  it('should return a validation error when tradingName is an empty string', () => {
    const result = tradingName(mockBody, mockErrors);

    const expected = generateValidationErrors(TRADING_NAME, errorMessage, mockErrors);

    expect(result).toEqual(expected);
  });

  it('should return a validation error when tradingName is null string', () => {
    mockBody[TRADING_NAME] = null;

    const result = tradingName(mockBody, mockErrors);

    const expected = generateValidationErrors(TRADING_NAME, errorMessage, mockErrors);

    expect(result).toEqual(expected);
  });

  it('should return a validation error when tradingName is not in the body', () => {
    delete mockBody[TRADING_NAME];

    const result = tradingName(mockBody, mockErrors);

    const expected = generateValidationErrors(TRADING_NAME, errorMessage, mockErrors);

    expect(result).toEqual(expected);
  });

  it('should not return a validation error when tradingName is yes', () => {
    mockBody[TRADING_NAME] = 'yes';

    const result = tradingName(mockBody, mockErrors);

    expect(result).toEqual(mockErrors);
  });

  it('should not return a validation error when tradingName is no', () => {
    mockBody[TRADING_NAME] = 'no';

    const result = tradingName(mockBody, mockErrors);

    expect(result).toEqual(mockErrors);
  });
});
