import { optionalFields, generateFields, yourBuyerSummaryList } from '.';
import generateCompanyOrOrganisationFields from './company-or-organisation';
import connectionWithBuyerFields from './connection-with-buyer';
import tradingHistoryFields from './trading-history';
import creditInsuranceHistoryFields from './credit-insurance-history';
import financialAccountsFields from './financial-accounts';
import generateGroupsOfSummaryLists from '../generate-groups-of-summary-lists';
import mockApplication, { mockApplicationBuyer, referenceNumber } from '../../../test-mocks/mock-application';

const { buyer } = mockApplication;

const totalContractValueOverThresholdTrue = true;
const totalContractValueOverThresholdFalse = false;

const mockMigratedV1toV2True = true;
const mockMigratedV1toV2False = false;

const checkAndChange = false;

describe('server/helpers/summary-lists/your-buyer', () => {
  describe('optionalFields', () => {
    describe('when totalContractValueOverThreshold=false, migratedV1toV2=true', () => {
      it('should return fields and values from creditInsuranceHistoryFields when totalContractValueOverThreshold is "true"', () => {
        const result = optionalFields(mockApplicationBuyer, referenceNumber, totalContractValueOverThresholdFalse, mockMigratedV1toV2True, checkAndChange);

        const expected = [creditInsuranceHistoryFields(mockApplicationBuyer.relationship, referenceNumber, checkAndChange)];

        expect(result).toEqual(expected);
      });
    });

    describe('when totalContractValueOverThreshold=true, migratedV1toV2=false', () => {
      it('should return fields and values from creditInsuranceHistoryFields when totalContractValueOverThreshold is "true"', () => {
        const result = optionalFields(mockApplicationBuyer, referenceNumber, totalContractValueOverThresholdTrue, mockMigratedV1toV2False, checkAndChange);

        const expected = [creditInsuranceHistoryFields(mockApplicationBuyer.relationship, referenceNumber, checkAndChange)];

        expect(result).toEqual(expected);
      });
    });

    describe('when totalContractValueOverThreshold=false, migratedV1toV2=false', () => {
      it('should return fields and values from creditInsuranceHistoryFields when totalContractValueOverThreshold is "false"', () => {
        const result = optionalFields(mockApplicationBuyer, referenceNumber, totalContractValueOverThresholdFalse, mockMigratedV1toV2False, checkAndChange);

        expect(result).toEqual([]);
      });
    });
  });

  describe('generateFields', () => {
    it('should return fields and values from the submitted data/answers', () => {
      const result = generateFields(mockApplicationBuyer, mockApplication.eligibility, referenceNumber, totalContractValueOverThresholdTrue, checkAndChange);

      const expected = [
        generateCompanyOrOrganisationFields(buyer, mockApplication.eligibility, referenceNumber, checkAndChange),
        connectionWithBuyerFields(buyer.relationship, referenceNumber, checkAndChange),
        tradingHistoryFields(buyer.buyerTradingHistory, referenceNumber, checkAndChange),
        ...optionalFields(buyer, referenceNumber, totalContractValueOverThresholdTrue, mockMigratedV1toV2False, checkAndChange),
        financialAccountsFields(buyer.relationship, referenceNumber, checkAndChange),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('yourBuyerSummaryList', () => {
    it('should return an array of summary list rows', () => {
      const result = yourBuyerSummaryList(
        mockApplicationBuyer,
        mockApplication.eligibility,
        referenceNumber,
        totalContractValueOverThresholdTrue,
        mockMigratedV1toV2False,
      );

      const fields = generateFields(
        mockApplicationBuyer,
        mockApplication.eligibility,
        referenceNumber,
        totalContractValueOverThresholdTrue,
        mockMigratedV1toV2False,
        checkAndChange,
      );

      const expected = generateGroupsOfSummaryLists(fields);

      expect(result).toEqual(expected);
    });
  });
});
