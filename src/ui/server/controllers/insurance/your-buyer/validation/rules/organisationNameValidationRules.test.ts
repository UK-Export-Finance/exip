import generateValidationErrors from '../../../../../helpers/validation';
import { FIELDS } from '../../../../../content-strings/fields/insurance/your-buyer';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import { organisationNameValidationRules } from './organisationNameValidationRules';

const {
  INSURANCE: {
    YOUR_BUYER: { BUYER_ORGANISATION },
  },
} = ERROR_MESSAGES;

const { YOUR_BUYER } = FIELDS;

describe('controllers/insurance/your-buyer/validation/organisation/', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe('when organisation name field  is not provided', () => {
    it('should return validation error', () => {
      const mockSubmittedData = { organisation: '', country: 'XAD' };

      const result = organisationNameValidationRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(YOUR_BUYER.BUYER_ORGANISATION.ID, BUYER_ORGANISATION.IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });
});
