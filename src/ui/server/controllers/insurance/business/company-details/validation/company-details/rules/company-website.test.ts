import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../../constants';
import { RequestBody } from '../../../../../../../../types';
import companyWebsite from './company-website';
import generateValidationErrors from '../../../../../../../helpers/validation';
import { mockErrors } from '../../../../../../../test-mocks';

const {
  YOUR_COMPANY: { WEBSITE },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;
const errorMessage = EXPORTER_BUSINESS[WEBSITE].INCORRECT_FORMAT;

describe('controllers/insurance/business/company-details/validation/company-details/rules/company-website', () => {
  const mockBody = {
    [WEBSITE]: '',
  } as RequestBody;

  describe('with errors', () => {
    it(`should return a validation error when ${WEBSITE} is only 'www'`, () => {
      mockBody[WEBSITE] = 'www';

      const result = companyWebsite(mockBody, mockErrors);

      const expected = generateValidationErrors(WEBSITE, errorMessage, mockErrors);

      expect(result).toEqual(expected);
    });

    it(`should return a validation error when ${WEBSITE} has a trailing '.'`, () => {
      mockBody[WEBSITE] = 'www.';

      const result = companyWebsite(mockBody, mockErrors);

      const expected = generateValidationErrors(WEBSITE, errorMessage, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe(`${WEBSITE} is the correct format`, () => {
    it('should not return a validation error', () => {
      mockBody[WEBSITE] = 'www.gov.uk';

      const result = companyWebsite(mockBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });

  describe(`${WEBSITE} is an empty string`, () => {
    it('should not return a validation error', () => {
      mockBody[WEBSITE] = '';

      const result = companyWebsite(mockBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
