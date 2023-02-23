import { generateFields, yourBusinessSummaryList } from '.';
import generateSummaryListRows from '../generate-summary-list-rows';
import generateYourCompanyFields from './your-company-fields';
import mockApplication, { mockExporterCompany } from '../../../test-mocks/mock-application';

describe('server/helpers/summary-lists/your-business', () => {
  const { referenceNumber } = mockApplication;

  describe('generateFields', () => {
    it('should return fields and values from the submitted data/answers', () => {
      const result = generateFields(mockExporterCompany, referenceNumber);

      const expected = [...generateYourCompanyFields(mockExporterCompany, referenceNumber)];

      expect(result).toEqual(expected);
    });
  });

  describe('yourBusinessSummaryList', () => {
    const mockAnswers = mockExporterCompany;

    it('should return an array of summary list rows', () => {
      const result = yourBusinessSummaryList(mockAnswers, referenceNumber);

      const fields = generateFields(mockAnswers, referenceNumber);

      const expected = generateSummaryListRows(fields);

      expect(result).toEqual(expected);
    });
  });
});
