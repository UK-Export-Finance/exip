import { getInsuredFor, getContractValue, getTotalMonths, calculateEstimatedCost, generateQuote } from '.';
import { FIELD_IDS, FIELD_VALUES } from '../constants';
import { getPremiumRate } from './get-premium-rate';
import { getPercentageOfNumber } from '../helpers/number';
import { mockSession } from '../test-mocks';

const {
  ELIGIBILITY: { BUYER_COUNTRY, CONTRACT_VALUE, CREDIT_PERIOD, CURRENCY, MAX_AMOUNT_OWED, PERCENTAGE_OF_COVER },
  QUOTE,
  POLICY_TYPE,
  POLICY_LENGTH,
} = FIELD_IDS;

describe('server/generate-quote/index', () => {
  describe('getContractValue', () => {
    describe('when policy type is single', () => {
      it('should return contract value', () => {
        const mockSubmittedData = {
          [CONTRACT_VALUE]: 1234,
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
        };

        const result = getContractValue(mockSubmittedData);
        const expected = {
          [CONTRACT_VALUE]: mockSubmittedData[CONTRACT_VALUE],
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when policy type is multiple', () => {
      it('should return max amount owed', () => {
        const mockSubmittedData = {
          [MAX_AMOUNT_OWED]: 5678,
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTIPLE,
        };

        const result = getContractValue(mockSubmittedData);
        const expected = {
          [MAX_AMOUNT_OWED]: mockSubmittedData[MAX_AMOUNT_OWED],
        };

        expect(result).toEqual(expected);
      });
    });

    it('should return 0', () => {
      const result = getContractValue({});

      expect(result).toEqual(0);
    });
  });

  describe('getInsuredFor', () => {
    describe('when policy type is single', () => {
      it('should return percentage of contract value', () => {
        const mockSubmittedData = {
          quoteEligibility: {
            [CONTRACT_VALUE]: 1234,
            [PERCENTAGE_OF_COVER]: 80,
            [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
          },
        };

        const result = getInsuredFor(mockSubmittedData.quoteEligibility);
        const expected = Number(getPercentageOfNumber(80, 1234));

        expect(result).toEqual(expected);
      });
    });

    describe('when policy type is multiple', () => {
      it('should return percentage of max amount owed', () => {
        const mockSubmittedData = {
          quoteEligibility: {
            [MAX_AMOUNT_OWED]: 5678,
            [PERCENTAGE_OF_COVER]: 80,
            [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTIPLE,
          },
        };

        const result = getInsuredFor(mockSubmittedData.quoteEligibility);
        const expected = Number(getPercentageOfNumber(80, 5678));

        expect(result).toEqual(expected);
      });
    });

    it('should return 0', () => {
      const result = getContractValue({});

      expect(result).toEqual(0);
    });
  });

  describe('getTotalMonths', () => {
    describe('when policy type is single', () => {
      it('should return the total of policy length + business buffer months', () => {
        const mockPolicyType = FIELD_VALUES.POLICY_TYPE.SINGLE;
        const mockPolicyLength = 5;

        const result = getTotalMonths(mockPolicyType, mockPolicyLength);

        const expected = mockPolicyLength + 1;

        expect(result).toEqual(expected);
      });
    });

    describe('when policy type is multiple', () => {
      it('should return the total of credit period + policy length + business buffer months', () => {
        const mockPolicyType = FIELD_VALUES.POLICY_TYPE.MULTIPLE;
        const mockPolicyLength = FIELD_VALUES.POLICY_LENGTH.MULTIPLE;
        const mockCreditPeriod = 2;

        const result = getTotalMonths(mockPolicyType, mockPolicyLength, mockCreditPeriod);

        const expected = mockCreditPeriod + 1;

        expect(result).toEqual(expected);
      });
    });

    describe('when policy type is not single or multiple(invalid)', () => {
      it('should return 0', () => {
        const mockPolicyType = 'incorrect';
        const mockPolicyLength = 1;
        const mockCreditPeriod = 2;

        const result = getTotalMonths(mockPolicyType, mockPolicyLength, mockCreditPeriod);

        expect(result).toEqual(0);
      });
    });
  });

  describe('calculateEstimatedCost', () => {
    it('should return premium rate * contract value', () => {
      const mockPremiumRate = 2.3;
      const mockContractValue = 1000;

      const result = calculateEstimatedCost(mockPremiumRate, mockContractValue);

      const expected = Number(getPercentageOfNumber(mockPremiumRate, mockContractValue));

      expect(result).toEqual(expected);
    });
  });

  describe('generateQuote', () => {
    it('should return a quote', () => {
      const mockSubmittedData = mockSession.submittedData;

      const result = generateQuote(mockSubmittedData);

      const mockPercentageOfCover = 90;

      const { quoteEligibility } = mockSubmittedData;
      const expectedTotalMonths = getTotalMonths(quoteEligibility[POLICY_TYPE], quoteEligibility[POLICY_LENGTH], quoteEligibility[CREDIT_PERIOD]);

      const expectedPremiumRate = getPremiumRate(
        mockSubmittedData.quoteEligibility[POLICY_TYPE],
        mockSubmittedData.quoteEligibility[BUYER_COUNTRY].riskCategory,
        expectedTotalMonths,
        mockPercentageOfCover,
      );

      const expected = {
        ...getContractValue(mockSubmittedData.quoteEligibility),
        [PERCENTAGE_OF_COVER]: mockSubmittedData.quoteEligibility[PERCENTAGE_OF_COVER],
        [QUOTE.INSURED_FOR]: getInsuredFor(mockSubmittedData.quoteEligibility),
        [QUOTE.BUYER_LOCATION]: mockSubmittedData.quoteEligibility[BUYER_COUNTRY],
        [CURRENCY]: mockSubmittedData.quoteEligibility[CURRENCY],
        [CREDIT_PERIOD]: mockSubmittedData.quoteEligibility[CREDIT_PERIOD],
        [POLICY_TYPE]: mockSubmittedData.quoteEligibility[POLICY_TYPE],
        [POLICY_LENGTH]: mockSubmittedData.quoteEligibility[POLICY_LENGTH],
      };

      expected[QUOTE.PREMIUM_RATE_PERCENTAGE] = expectedPremiumRate;

      const [contractValueAmount] = Object.values(getContractValue(mockSubmittedData.quoteEligibility));

      expected[QUOTE.ESTIMATED_COST] = calculateEstimatedCost(expectedPremiumRate, contractValueAmount);

      expect(result).toEqual(expected);
    });
  });
});
