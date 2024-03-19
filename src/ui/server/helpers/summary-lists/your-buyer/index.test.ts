import { optionalFields, generateFields, yourBuyerSummaryList } from '.';
import generateCompanyOrOrganisationFields from './company-or-organisation';
import connectionWithBuyerFields from './connection-with-buyer';
import tradingHistoryFields from './trading-history';
import creditInsuranceHistoryFields from './credit-insurance-history';
import financialAccountsFields from './financial-accounts';
import generateGroupsOfSummaryLists from '../generate-groups-of-summary-lists';
import mockApplication, { mockApplicationBuyer } from '../../../test-mocks/mock-application';

describe('server/helpers/summary-lists/your-buyer', () => {
  const { referenceNumber, buyer, totalContractValueOverThreshold } = mockApplication;
  const checkAndChange = false;

  describe('optionalFields', () => {
    it('should return fields and values from creditInsuranceHistoryFields when totalContractValueOverThreshold is "true"', () => {
      const totalContractValueOverThresholdTrue = true;
      const result = optionalFields(mockApplicationBuyer, referenceNumber, totalContractValueOverThresholdTrue, checkAndChange);

      const expected = [creditInsuranceHistoryFields(mockApplicationBuyer.relationship, referenceNumber, checkAndChange)];

      expect(result).toEqual(expected);
    });

    it('should return fields and values from creditInsuranceHistoryFields when totalContractValueOverThreshold is "false"', () => {
      const totalContractValueOverThresholdFalse = false;
      const result = optionalFields(mockApplicationBuyer, referenceNumber, totalContractValueOverThresholdFalse, checkAndChange);

      expect(result).toEqual([]);
    });
  });

  describe('generateFields', () => {
    it('should return fields and values from the submitted data/answers', () => {
      const result = generateFields(mockApplicationBuyer, mockApplication.eligibility, referenceNumber, totalContractValueOverThreshold, checkAndChange);

      const expected = [
        generateCompanyOrOrganisationFields(buyer, mockApplication.eligibility, referenceNumber, checkAndChange),
        connectionWithBuyerFields(buyer.relationship, referenceNumber, checkAndChange),
        tradingHistoryFields(buyer.buyerTradingHistory, referenceNumber, checkAndChange),
        ...optionalFields(buyer, referenceNumber, totalContractValueOverThreshold, checkAndChange),
        financialAccountsFields(buyer.relationship, referenceNumber, checkAndChange),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('yourBuyerSummaryList', () => {
    it('should return an array of summary list rows', () => {
      const result = yourBuyerSummaryList(mockApplicationBuyer, mockApplication.eligibility, referenceNumber);

      const fields = generateFields(mockApplicationBuyer, mockApplication.eligibility, referenceNumber, checkAndChange);

      const expected = generateGroupsOfSummaryLists(fields);

      expect(result).toEqual(expected);
    });
  });
});
