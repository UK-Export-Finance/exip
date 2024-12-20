import companyNumber from '.';
import { MAXIMUM_CHARACTERS } from '../../../../../../../constants';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import maxLengthValidation from '../../../../../../../shared-validation/max-length';
import { mockErrors } from '../../../../../../../test-mocks';

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { COMPANY_NUMBER: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  REQUESTED_JOINTLY_INSURED_PARTY: {
    [FIELD_ID]: { ABOVE_MAXIMUM: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES.INSURANCE.POLICY;

describe('controllers/insurance/policy/other-company-details/validation/rules/company-number', () => {
  const mockBody = {
    [FIELD_ID]: 'Mock company number',
  };

  describe('when a value is provided', () => {
    it('should return the result of providedAndMaxLength', () => {
      const result = companyNumber(mockBody, mockErrors);

      const expected = maxLengthValidation(
        mockBody[FIELD_ID],
        FIELD_ID,
        ERROR_MESSAGE,
        mockErrors,
        MAXIMUM_CHARACTERS.REQUESTED_JOINTLY_INSURED_PARTY.COMPANY_NUMBER,
      );

      expect(result).toEqual(expected);
    });
  });

  describe('when a value is NOT provided', () => {
    it('should return the provided errors', () => {
      const result = companyNumber({}, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
