import { generateFields, yourBusinessSummaryLists } from '.';
import generateNatureOfYourBusinessFields from './nature-of-your-business-fields';
import generateYourCompanyFields from './your-company-fields';
import generateTurnoverFields from './turnover-fields';
import generateCreditControlFields from './credit-control-fields';
import generateGroupsOfSummaryLists from '../generate-groups-of-summary-lists';
import mockApplication, { mockCompany, mockBusiness } from '../../../test-mocks/mock-application';

describe('server/helpers/summary-lists/your-business', () => {
  const { referenceNumber } = mockApplication;
  const checkAndChange = false;

  describe('generateFields', () => {
    it('should return fields and values from the submitted data/answers', () => {
      const result = generateFields(mockCompany, mockBusiness, referenceNumber, checkAndChange);

      const expected = [
        generateYourCompanyFields(mockCompany, referenceNumber, checkAndChange),
        generateNatureOfYourBusinessFields(mockBusiness, referenceNumber, checkAndChange),
        generateTurnoverFields(mockBusiness, referenceNumber, checkAndChange),
        generateCreditControlFields(mockBusiness, referenceNumber, checkAndChange),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('yourBusinessSummaryLists', () => {
    it('should return an array of summary list rows', () => {
      const result = yourBusinessSummaryLists(mockCompany, mockBusiness, referenceNumber);

      const fields = generateFields(mockCompany, mockBusiness, referenceNumber, checkAndChange);

      const expected = generateGroupsOfSummaryLists(fields);

      expect(result).toEqual(expected);
    });
  });
});
