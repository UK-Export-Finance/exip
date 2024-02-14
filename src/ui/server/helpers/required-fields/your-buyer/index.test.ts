import requiredFields, { workingWithBuyerTasks, tradingHistoryTasks, creditInsuranceCoverTasks } from '.';
import YOUR_BUYER_FIELD_IDS from '../../../constants/field-ids/insurance/your-buyer';

const { REGISTRATION_NUMBER, WEBSITE: BUYER_WEBSITE, COUNTRY, ...COMPANY_OR_ORGANISATION_FIELDS } = YOUR_BUYER_FIELD_IDS.COMPANY_OR_ORGANISATION;
const {
  CONNECTION_WITH_BUYER_DESCRIPTION,
  CONNECTION_WITH_BUYER,
  TRADED_WITH_BUYER,
  OUTSTANDING_PAYMENTS,
  TOTAL_AMOUNT_OVERDUE,
  TOTAL_OUTSTANDING_PAYMENTS,
  HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
  PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
  FAILED_PAYMENTS,
  HAS_BUYER_FINANCIAL_ACCOUNTS,
} = YOUR_BUYER_FIELD_IDS;

describe('server/helpers/required-fields/your-buyer', () => {
  describe('requiredFields', () => {
    it('should return array of required fields', () => {
      const result = requiredFields({
        connectionWithBuyer: true,
        tradedWithBuyer: true,
        outstandingPayments: true,
        hasPreviousCreditInsuranceWithBuyer: true,
        totalContractValueOverThreshold: true,
      });

      const expected = [
        ...Object.values({ ...COMPANY_OR_ORGANISATION_FIELDS }),
        ...workingWithBuyerTasks({ connectionWithBuyer: true }),
        ...tradingHistoryTasks({ tradedWithBuyer: true, outstandingPayments: true }),
        ...creditInsuranceCoverTasks({ totalContractValueOverThreshold: true, hasPreviousCreditInsuranceWithBuyer: true }),
        HAS_BUYER_FINANCIAL_ACCOUNTS,
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('workingWithBuyerTasks', () => {
    describe('when connectedWithBuyer is "true"', () => {
      it('should return array of relevant working with buyer fields', () => {
        const result = workingWithBuyerTasks({ connectionWithBuyer: true });

        const expected = [CONNECTION_WITH_BUYER_DESCRIPTION, CONNECTION_WITH_BUYER, TRADED_WITH_BUYER];

        expect(result).toEqual(expected);
      });
    });

    describe('when connectedWithBuyer is "false"', () => {
      it('should return array of relevant working with buyer fields', () => {
        const result = workingWithBuyerTasks({ connectionWithBuyer: false });

        const expected = [CONNECTION_WITH_BUYER, TRADED_WITH_BUYER];

        expect(result).toEqual(expected);
      });
    });
  });

  describe('tradingHistoryTasks', () => {
    describe('when tradedWithBuyer is "true" and outstandingPayments is true', () => {
      it('should return array of relevant tradingHistoryTasks fields', () => {
        const result = tradingHistoryTasks({ tradedWithBuyer: true, outstandingPayments: true });

        const expected = [OUTSTANDING_PAYMENTS, TOTAL_AMOUNT_OVERDUE, TOTAL_OUTSTANDING_PAYMENTS, FAILED_PAYMENTS];

        expect(result).toEqual(expected);
      });
    });

    describe('when tradedWithBuyer is "true" and outstandingPayments is false', () => {
      it('should return array of relevant tradingHistoryTasks fields', () => {
        const result = tradingHistoryTasks({ tradedWithBuyer: true, outstandingPayments: false });

        const expected = [OUTSTANDING_PAYMENTS, FAILED_PAYMENTS];

        expect(result).toEqual(expected);
      });
    });

    describe('when tradedWithBuyer is "false" and outstandingPayments is false', () => {
      it('should return an empty array', () => {
        const result = tradingHistoryTasks({ tradedWithBuyer: false, outstandingPayments: false });

        expect(result).toEqual([]);
      });
    });
  });

  describe('creditInsuranceCoverTasks', () => {
    describe('when totalContractValueOverThreshold is "true" and hasPreviousCreditInsuranceWithBuyer is true', () => {
      it('should return array of relevant creditInsuranceCoverTasks fields', () => {
        const result = creditInsuranceCoverTasks({ totalContractValueOverThreshold: true, hasPreviousCreditInsuranceWithBuyer: true });

        const expected = [HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER, PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER];

        expect(result).toEqual(expected);
      });
    });

    describe('when totalContractValueOverThreshold is "true" and hasPreviousCreditInsuranceWithBuyer is false', () => {
      it('should return array of relevant creditInsuranceCoverTasks fields', () => {
        const result = creditInsuranceCoverTasks({ totalContractValueOverThreshold: true, hasPreviousCreditInsuranceWithBuyer: false });

        const expected = [HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER];

        expect(result).toEqual(expected);
      });
    });

    describe('when tradedWithBuyer is "false" and outstandingPayments is false', () => {
      it('should return an empty array', () => {
        const result = creditInsuranceCoverTasks({ totalContractValueOverThreshold: false, hasPreviousCreditInsuranceWithBuyer: true });

        expect(result).toEqual([]);
      });
    });
  });
});
