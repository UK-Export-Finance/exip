import websiteRule from './website';
import validateWebsiteAddress from '../../../../../../shared-validation/website-address';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/your-buyer';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { RequestBody } from '../../../../../../../types';

const {
  COMPANY_OR_ORGANISATION: { WEBSITE: FIELD_ID },
} = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: {
      COMPANY_OR_ORGANISATION: { [FIELD_ID]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/your-buyer/validation/website', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  describe('when the website is not provided', () => {
    it('should not return validation errors', () => {
      const result = websiteRule(mockBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });

  describe('when the website is valid', () => {
    it('should not return validation errors', () => {
      mockBody[FIELD_ID] = 'www.gov.uk';

      const result = websiteRule(mockBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });

  describe('when the website is incorrectly entered', () => {
    it('should return `validateWebsiteAddress`', () => {
      mockBody[FIELD_ID] = 'google';

      const result = websiteRule(mockBody, mockErrors);
      const expected = validateWebsiteAddress(mockBody[FIELD_ID], FIELD_ID, ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });
});
