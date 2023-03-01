import countryRules from './country';
import { FIELD_IDS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import generateValidationErrors from '../../../../../../helpers/validation';

const {
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION: { COUNTRY: FIELD_ID },
  },
} = FIELD_IDS.INSURANCE;

const { [FIELD_ID]: ERROR_MESSAGE } = ERROR_MESSAGES;

describe('controllers/insurance/your-buyer/validation/country', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe('when the field is not provided', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {};

      const result = countryRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });
});
