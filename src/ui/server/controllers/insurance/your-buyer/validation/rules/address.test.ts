import generateValidationErrors from '../../../../../helpers/validation';
import { FIELDS } from '../../../../../content-strings/fields/insurance/your-buyer';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import { addressRules } from './address';

const {
  INSURANCE: {
    YOUR_BUYER: { BUYER_ADDRESS },
  },
} = ERROR_MESSAGES;

const { YOUR_BUYER } = FIELDS;

describe('controllers/insurance/your-buyer/validation/address/', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe('when address name field  is not provided', () => {
    it('should return validation error', () => {
      const mockSubmittedData = { organisation: 'xdfd', country: 'XAD', address: '' };

      const result = addressRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(YOUR_BUYER.BUYER_ADDRESS.ID, BUYER_ADDRESS.IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when address name field exceeds max characters', () => {
    it('should return validation error', () => {
      const addresMockString = `1234asdfdsafsadfdsfdffdasdfdsafsadfdsfdffdasdfdsafsadfdsfdffdasdfdsafsadfdsfd
                                ffdasdfdsafsadfdsfdffdasdfdsafsadfdsfdffdasdfdsafsadfdsfdffdasdfdsafsadfd
                                sfdffdasdfdsafsadfdsfdffdasdfdsafsadfdsfdffdasdfdsafsadfdsfdffdasdfdsafsa
                                dfdsfdffdasdfdsafsadfdsfdffdasdfdsafsadfdsfdffddfdsfdffdasdfdsafsadfdsfdf
                                dfdsfdffdasdfdsafsadfdsfdffdasdfdsafsadfdsfdffdfdasdfdsafsadfdsfdffd`;
      const mockSubmittedData = { organisation: 'xdfd', country: 'XAD', address: addresMockString };

      const result = addressRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(YOUR_BUYER.BUYER_ADDRESS.ID, BUYER_ADDRESS.ABOVE_MAXIMUM, mockErrors);

      expect(result).toEqual(expected);
    });
  });
});
