import { generateFields, yourBusinessSummaryList } from '.';
import generateSummaryListRows from '../generate-summary-list-rows';
import generateNatureOfYourBusinessFields from './nature-of-your-business-fields';
import generateYourCompanyFields from './your-company-fields';
import generateTurnoverFields from './turnover-fields';
import { generateBrokerFields } from './broker-fields';
import generateCreditControlFields from './credit-control-fields';
import mockApplication, { mockCompany, mockBusiness, mockBroker } from '../../../test-mocks/mock-application';

describe('server/helpers/summary-lists/your-business', () => {
  const { referenceNumber } = mockApplication;
  const checkAndChange = false;

  describe('generateFields', () => {
    it('should return fields and values from the submitted data/answers', () => {
      const result = generateFields(mockCompany, mockBusiness, mockBroker, referenceNumber, checkAndChange);

      const expected = [
        ...generateYourCompanyFields(mockCompany, referenceNumber, checkAndChange),
        ...generateNatureOfYourBusinessFields(mockBusiness, referenceNumber, checkAndChange),
        ...generateTurnoverFields(mockBusiness, referenceNumber, checkAndChange),
        ...generateCreditControlFields(mockBusiness, referenceNumber, checkAndChange),
        ...generateBrokerFields(mockBroker, referenceNumber, checkAndChange),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('yourBusinessSummaryList', () => {
    it('should return an array of summary list rows', () => {
      const result = yourBusinessSummaryList(mockCompany, mockBusiness, mockBroker, referenceNumber);

      const fields = generateFields(mockCompany, mockBusiness, mockBroker, referenceNumber, checkAndChange);

      const expected = generateSummaryListRows(fields);

      expect(result).toEqual(expected);
    });
  });
});
