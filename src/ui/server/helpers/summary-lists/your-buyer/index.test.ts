import { generateFields, yourBuyerSummaryList } from '.';
import generateSummaryListRows from '../generate-summary-list-rows';
import generateCompanyOrOrganisationFields from './company-or-organisation';
import workingWithBuyerFields from './working-with-buyer';
import mockApplication, { mockApplicationBuyer } from '../../../test-mocks/mock-application';

describe('server/helpers/summary-lists/your-buyer', () => {
  const { referenceNumber } = mockApplication;

  describe('generateFields', () => {
    it('should return fields and values from the submitted data/answers', () => {
      const result = generateFields(mockApplicationBuyer, referenceNumber);

      const expected = [
        ...generateCompanyOrOrganisationFields(mockApplicationBuyer, referenceNumber),
        ...workingWithBuyerFields(mockApplicationBuyer, referenceNumber),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('yourBusinessSummaryList', () => {
    it('should return an array of summary list rows', () => {
      const result = yourBuyerSummaryList(mockApplicationBuyer, referenceNumber);

      const fields = generateFields(mockApplicationBuyer, referenceNumber);

      const expected = generateSummaryListRows(fields);

      expect(result).toEqual(expected);
    });
  });
});
