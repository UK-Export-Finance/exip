import { generateFields, yourBusinessSummaryList } from '.';
import generateSummaryListRows from '../generate-summary-list-rows';
import generateNatureOfYourBusinessFields from './nature-of-your-business-fields';
import generateYourCompanyFields from './your-company-fields';
import generateTurnoverFields from './turnover-fields';
import { generateBrokerFields } from './broker-fields';
import mockApplication, { mockExporterCompany, mockExporterBusiness, mockExporterBroker } from '../../../test-mocks/mock-application';

describe('server/helpers/summary-lists/your-business', () => {
  const { referenceNumber } = mockApplication;

  describe('generateFields', () => {
    it('should return fields and values from the submitted data/answers', () => {
      const result = generateFields(mockExporterCompany, mockExporterBusiness, mockExporterBroker, referenceNumber);

      const expected = [
        ...generateYourCompanyFields(mockExporterCompany, referenceNumber),
        ...generateNatureOfYourBusinessFields(mockExporterBusiness, referenceNumber),
        ...generateTurnoverFields(mockExporterBusiness, referenceNumber),
        ...generateBrokerFields(mockExporterBroker, referenceNumber),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('yourBusinessSummaryList', () => {
    it('should return an array of summary list rows', () => {
      const result = yourBusinessSummaryList(mockExporterCompany, mockExporterBusiness, mockExporterBroker, referenceNumber);

      const fields = generateFields(mockExporterCompany, mockExporterBusiness, mockExporterBroker, referenceNumber);

      const expected = generateSummaryListRows(fields);

      expect(result).toEqual(expected);
    });
  });
});
