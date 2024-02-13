import { generateFields, yourBuyerSummaryList } from '.';
import generateCompanyOrOrganisationFields from './company-or-organisation';
import connectionWithBuyerFields from './connection-with-buyer';
import tradingHistoryFields from './trading-history';
import generateGroupsOfSummaryLists from '../generate-groups-of-summary-lists';
import mockApplication, { mockApplicationBuyer } from '../../../test-mocks/mock-application';

describe('server/helpers/summary-lists/your-buyer', () => {
  const { referenceNumber, buyer } = mockApplication;
  const checkAndChange = false;

  describe('generateFields', () => {
    it('should return fields and values from the submitted data/answers', () => {
      const result = generateFields(mockApplicationBuyer, referenceNumber, checkAndChange);

      const expected = [
        generateCompanyOrOrganisationFields(buyer, referenceNumber, checkAndChange),
        connectionWithBuyerFields(buyer.relationship, referenceNumber, checkAndChange),
        tradingHistoryFields(buyer.buyerTradingHistory, referenceNumber, checkAndChange),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('yourBuyerSummaryList', () => {
    it('should return an array of summary list rows', () => {
      const result = yourBuyerSummaryList(mockApplicationBuyer, referenceNumber);

      const fields = generateFields(mockApplicationBuyer, referenceNumber, checkAndChange);

      const expected = generateGroupsOfSummaryLists(fields);

      expect(result).toEqual(expected);
    });
  });
});
