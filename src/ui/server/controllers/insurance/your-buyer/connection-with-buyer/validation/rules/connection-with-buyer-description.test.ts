import connectionWithBuyerDescriptionRule from './connection-with-buyer-description';
import { FIELD_IDS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import generateValidationErrors from '../../../../../../helpers/validation';
import maxLengthValidation from '../../../../../../shared-validation/max-length';
import { RequestBody } from '../../../../../../../types';
import { mockErrors } from '../../../../../../test-mocks';

const {
  INSURANCE: {
    YOUR_BUYER: { CONNECTION_WITH_BUYER_DESCRIPTION: FIELD_ID, CONNECTION_WITH_BUYER },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { [FIELD_ID]: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES;

const MAXIMUM = 1000;

describe('controllers/insurance/your-buyer/connection-with-buyer/validation/rules/connection-with-buyer-description', () => {
  const mockBody = {
    [FIELD_ID]: '',
    [CONNECTION_WITH_BUYER]: true,
  } as RequestBody;

  describe(`${CONNECTION_WITH_BUYER} is false`, () => {
    it(`should return "mockErrors" when ${CONNECTION_WITH_BUYER} is false`, () => {
      mockBody[CONNECTION_WITH_BUYER] = false;

      const result = connectionWithBuyerDescriptionRule(mockBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });

  describe(`${CONNECTION_WITH_BUYER} is true`, () => {
    it(`should return "IS_EMPTY" error message when ${FIELD_ID} is not provided`, () => {
      mockBody[CONNECTION_WITH_BUYER] = 'true';

      const result = connectionWithBuyerDescriptionRule(mockBody, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });

    it(`should return the result of inputValidation when ${FIELD_ID} is over the maximum`, () => {
      mockBody[CONNECTION_WITH_BUYER] = 'true';
      mockBody[FIELD_ID] = 'a'.repeat(MAXIMUM + 1);

      const result = connectionWithBuyerDescriptionRule(mockBody, mockErrors);

      const expected = maxLengthValidation(mockBody[FIELD_ID], FIELD_ID, ERROR_MESSAGE.ABOVE_MAXIMUM, mockErrors, MAXIMUM);

      expect(result).toEqual(expected);
    });

    it(`should return the result of inputValidation when ${FIELD_ID} is valid`, () => {
      mockBody[CONNECTION_WITH_BUYER] = 'true';
      mockBody[FIELD_ID] = 'test';

      const result = connectionWithBuyerDescriptionRule(mockBody, mockErrors);

      const expected = maxLengthValidation(mockBody[FIELD_ID], FIELD_ID, ERROR_MESSAGE.ABOVE_MAXIMUM, mockErrors, MAXIMUM);

      expect(result).toEqual(expected);
    });
  });
});
