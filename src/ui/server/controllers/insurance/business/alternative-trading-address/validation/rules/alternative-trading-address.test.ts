import alternativeTradingAddress, { MAXIMUM } from './alternative-trading-address';
import { FIELD_IDS } from '../../../../../../constants';
import { RequestBody } from '../../../../../../../types';
import generateValidationErrors from '../../../../../../helpers/validation';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import inputValidation from '../../../../../../shared-validation/max-length';

const { FULL_ADDRESS: FIELD_ID } = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const {
  EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/business/alternative-trading-address/validation/rules/alternative-trading-address', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  describe(`when the ${FIELD_ID} input is empty`, () => {
    it('should return a validation error', () => {
      const response = alternativeTradingAddress(mockBody, mockErrors);

      const errorMessage = ERROR_MESSAGE.IS_EMPTY;
      const expected = generateValidationErrors(FIELD_ID, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe(`when the ${FIELD_ID} input is over ${MAXIMUM} characters`, () => {
    it('should return the result of "inputValidation"', () => {
      const mockValue = Number(MAXIMUM) + 1;

      mockBody[FIELD_ID] = 'a'.repeat(mockValue);
      const response = alternativeTradingAddress(mockBody, mockErrors);

      const errorMessage = ERROR_MESSAGE.ABOVE_MAXIMUM;
      const expected = inputValidation(mockBody[FIELD_ID], FIELD_ID, errorMessage, mockErrors, MAXIMUM);

      expect(response).toEqual(expected);
    });
  });
});
