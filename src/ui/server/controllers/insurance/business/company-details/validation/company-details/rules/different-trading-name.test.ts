import brokerName from './different-trading-name';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { MAXIMUM_CHARACTERS } from '../../../../../../../constants/validation';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/business';
import providedAndMaxLength from '../../../../../../../shared-validation/provided-and-max-length';
import { RequestBody } from '../../../../../../../../types';
import { mockErrors } from '../../../../../../../test-mocks';

const {
  YOUR_COMPANY: { DIFFERENT_TRADING_NAME: FIELD_ID, HAS_DIFFERENT_TRADING_NAME },
} = FIELD_IDS;

const {
  EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/business/company-details/validation/rules/different-trading-name', () => {
  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  it(`should return the result of providedAndMaxLength if ${HAS_DIFFERENT_TRADING_NAME} is true`, () => {
    mockBody[HAS_DIFFERENT_TRADING_NAME] = 'true';

    const response = brokerName(mockBody, mockErrors);

    const expected = providedAndMaxLength(mockBody, FIELD_ID, ERROR_MESSAGES_OBJECT, mockErrors, MAXIMUM_CHARACTERS.COMPANY_DIFFERENT_TRADING_NAME);

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
