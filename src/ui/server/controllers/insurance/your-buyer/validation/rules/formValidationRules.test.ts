import generateValidationErrors from '../../../../../helpers/validation';
import { FIELDS } from '../../../../../content-strings/fields/insurance/your-buyer';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import { FIELD_IDS } from '../../../../../constants';
import { validationRules } from './formValidationRules';

const {
  INSURANCE: {
    YOUR_BUYER: { BUYER_ORGANISATION },
  },
} = ERROR_MESSAGES;

const { YOUR_BUYER } = FIELDS;

describe('controllers/insurance/your-buyer/validation/rules/', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe('when country name filed  is not provided', () => {
    it('should return validation error', () => {
      const mockSubmittedData = { organisation: 'test', country: '' };

      const result = validationRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(YOUR_BUYER.BUYER_COUNTRY.ID, ERROR_MESSAGES[FIELD_IDS.COUNTRY].IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when organisation name filed  is not provided', () => {
    it('should return validation error', () => {
      const mockSubmittedData = { organisation: '', country: 'XAD' };

      const result = validationRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(YOUR_BUYER.BUYER_ORGANISATION.ID, BUYER_ORGANISATION.IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });
});
