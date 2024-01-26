import creditInsuranceCoverDescriptionRule from './credit-insurance-cover-description';
import { FIELD_IDS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { RequestBody } from '../../../../../../../types';
import generateValidationErrors from '../../../../../../helpers/validation';
import inputValidation from '../../../../../../shared-validation/max-length';

const {
  INSURANCE: {
    YOUR_BUYER: { PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER: FIELD_ID, HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { [FIELD_ID]: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES;

const MAXIMUM = 1000;

describe('controllers/insurance/your-buyer/credit-insurance-cover/validation/rules/credit-insurance-cover-description', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [FIELD_ID]: '',
    [HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]: 'true',
  } as RequestBody;

  describe(`${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} is false`, () => {
    it(`should return "mockErrors" when ${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} is false`, () => {
      mockBody[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER] = false;

      const result = creditInsuranceCoverDescriptionRule(mockBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });

  describe(`${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} is true`, () => {
    it(`should return "IS_EMPTY" error message when ${FIELD_ID} is not provided`, () => {
      mockBody[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER] = 'true';

      const result = creditInsuranceCoverDescriptionRule(mockBody, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });

    it(`should return the result of inputValidation when ${FIELD_ID} is over the maximum`, () => {
      mockBody[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER] = 'true';
      mockBody[FIELD_ID] = 'a'.repeat(MAXIMUM + 1);

      const result = creditInsuranceCoverDescriptionRule(mockBody, mockErrors);

      const expected = inputValidation(mockBody[FIELD_ID], FIELD_ID, ERROR_MESSAGE.ABOVE_MAXIMUM, mockErrors, MAXIMUM);

      expect(result).toEqual(expected);
    });

    it(`should return the result of inputValidation when ${FIELD_ID} is valid`, () => {
      mockBody[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER] = 'true';
      mockBody[FIELD_ID] = 'test';

      const result = creditInsuranceCoverDescriptionRule(mockBody, mockErrors);

      const expected = inputValidation(mockBody[FIELD_ID], FIELD_ID, ERROR_MESSAGE.ABOVE_MAXIMUM, mockErrors, MAXIMUM);

      expect(result).toEqual(expected);
    });
  });
});
