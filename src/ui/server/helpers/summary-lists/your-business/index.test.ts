import { generateFields, yourBusinessSummaryLists } from '.';
import generateNatureOfYourBusinessFields from './nature-of-your-business-fields';
import generateYourCompanyFields from './your-company-fields';
import generateTurnoverFields from './turnover-fields';
import generateCreditControlFields from './credit-control-fields';
import generateGroupsOfSummaryLists from '../generate-groups-of-summary-lists';
import { mockCompany, mockBusiness, referenceNumber } from '../../../test-mocks/mock-application';

describe('server/helpers/summary-lists/your-business', () => {
  const checkAndChange = false;

  describe('generateFields', () => {
    it('should return fields and values from the submitted data/answers', () => {
      const result = generateFields({
        company: mockCompany,
        business: mockBusiness,
        referenceNumber,
        checkAndChange,
      });

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
      const result = yourBusinessSummaryLists({
        company: mockCompany,
        business: mockBusiness,
        referenceNumber,
      });

      const fields = generateFields({
        company: mockCompany,
        business: mockBusiness,
        referenceNumber,
        checkAndChange,
      });

      const expected = generateGroupsOfSummaryLists(fields);

      expect(result).toEqual(expected);
    });
  });
});
