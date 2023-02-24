import { generateFields, yourBusinessSummaryList } from '.';
import generateSummaryListRows from '../generate-summary-list-rows';
import generateNatureOfYourBusinessFields from './nature-of-your-business-fields';
import generateYourCompanyFields from './your-company-fields';
import mockApplication, { mockExporterCompany, mockExporterBusiness } from '../../../test-mocks/mock-application';

describe('server/helpers/summary-lists/your-business', () => {
  const { referenceNumber } = mockApplication;

  describe('generateFields', () => {
    it('should return fields and values from the submitted data/answers', () => {
      const result = generateFields(mockExporterCompany, mockExporterBusiness, referenceNumber);

      const expected = [
        ...generateYourCompanyFields(mockExporterCompany, referenceNumber),
        ...generateNatureOfYourBusinessFields(mockExporterBusiness, referenceNumber),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('yourBusinessSummaryList', () => {
    it('should return an array of summary list rows', () => {
      const result = yourBusinessSummaryList(mockExporterCompany, mockExporterBusiness, referenceNumber);

      const fields = generateFields(mockExporterCompany, mockExporterBusiness, referenceNumber);

      const expected = generateSummaryListRows(fields);

      expect(result).toEqual(expected);
    });
  });
});
