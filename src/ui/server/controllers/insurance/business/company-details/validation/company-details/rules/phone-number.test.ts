import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../../constants';
import { RequestBody } from '../../../../../../../../types';
import phoneNumber from './phone-number';
import generateValidationErrors from '../../../../../../../helpers/validation';
import { mockPhoneNumbers } from '../../../../../../../test-mocks';

const { INVALID_PHONE_NUMBERS, VALID_PHONE_NUMBERS } = mockPhoneNumbers;

const {
  YOUR_COMPANY: { PHONE_NUMBER },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;
const errorMessage = EXPORTER_BUSINESS[PHONE_NUMBER].INCORRECT_FORMAT;

describe('controllers/insurance/business/company-details/validation/company-details/rules/phone-number', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [PHONE_NUMBER]: '',
  } as RequestBody;

  describe('with errors', () => {
    it(`should return a validation error when ${PHONE_NUMBER} is not correct`, () => {
      mockBody[PHONE_NUMBER] = INVALID_PHONE_NUMBERS.LANDLINE_LONG;

      const result = phoneNumber(mockBody, mockErrors);

      const expected = generateValidationErrors(PHONE_NUMBER, errorMessage, mockErrors);

      expect(result).toEqual(expected);
    });

    it(`should return a validation error when ${PHONE_NUMBER} is international`, () => {
      mockBody[PHONE_NUMBER] = INVALID_PHONE_NUMBERS.INTERNATIONAL;

      const result = phoneNumber(mockBody, mockErrors);

      const expected = generateValidationErrors(PHONE_NUMBER, errorMessage, mockErrors);

      expect(result).toEqual(expected);
    });

    it(`should return a validation error when ${PHONE_NUMBER} is an emergency number`, () => {
      mockBody[PHONE_NUMBER] = INVALID_PHONE_NUMBERS.EMERGENCY_NUMBER;

      const result = phoneNumber(mockBody, mockErrors);

      const expected = generateValidationErrors(PHONE_NUMBER, errorMessage, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe(`${PHONE_NUMBER} is the correct format`, () => {
    it('should not return a validation error', () => {
      mockBody[PHONE_NUMBER] = VALID_PHONE_NUMBERS.MOBILE;

      const result = phoneNumber(mockBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });

  describe(`${PHONE_NUMBER} is blank`, () => {
    it('should not return a validation error', () => {
      mockBody[PHONE_NUMBER] = '';

      const result = phoneNumber(mockBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
