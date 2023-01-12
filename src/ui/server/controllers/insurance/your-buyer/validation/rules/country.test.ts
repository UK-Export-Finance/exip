import generateValidationErrors from '../../../../../helpers/validation';
import { FIELDS } from '../../../../../content-strings/fields/insurance/your-buyer';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import { FIELD_IDS } from '../../../../../constants';
import { countryRules } from './country';

const { YOUR_BUYER } = FIELDS;

describe('controllers/insurance/your-buyer/validation/country', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe('when country name field  is not provided', () => {
    it('should return validation error', () => {
      const mockSubmittedData = { organisation: 'test', country: '' };

      const result = countryRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(YOUR_BUYER.BUYER_COUNTRY.ID, ERROR_MESSAGES[FIELD_IDS.COUNTRY].IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });
});
