import INSURANCE_FIELD_IDS from '../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../content-strings';
import dateRules from '../date';
import requestedStartDateRules from '.';
import { mockErrors } from '../../test-mocks';

const {
  POLICY: {
    CONTRACT_POLICY: { REQUESTED_START_DATE: FIELD_ID },
  },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
    },
  },
} = ERROR_MESSAGES;

describe('shared-validation/requested-start-date', () => {
  const mockFormBody = {};

  it('should return the result of dateRules', () => {
    const result = requestedStartDateRules(mockFormBody, mockErrors);

    const expected = dateRules({
      formBody: mockFormBody,
      errors: mockErrors,
      fieldId: FIELD_ID,
      errorMessages: ERROR_MESSAGES_OBJECT,
    });

    expect(result).toEqual(expected);
  });
});
