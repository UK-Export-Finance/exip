import { getInsuredFor, getContractValue, getTotalMonths, calculateEstimatedCost, generateQuote } from '.';
import { FIELD_IDS, FIELD_VALUES } from '../constants';
import { getPremiumRate } from './get-premium-rate';
import { getPercentageOfNumber } from '../helpers/number';
import { mockSession } from '../test-mocks';

const { BUYER_COUNTRY, CONTRACT_VALUE, CREDIT_PERIOD, CURRENCY, MAX_AMOUNT_OWED, PERCENTAGE_OF_COVER, POLICY_TYPE, POLICY_LENGTH, QUOTE } = FIELD_IDS;

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

    describe('when policy type is multi', () => {
      it('should return max amount owed', () => {
        const mockSubmittedData = {
          [MAX_AMOUNT_OWED]: 5678,
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
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
      it('should return pecentage of contract value', () => {
        const mockSubmittedData = {
          [CONTRACT_VALUE]: 1234,
          [PERCENTAGE_OF_COVER]: 80,
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
        };

        const result = getInsuredFor(mockSubmittedData);
        const expected = Number(getPercentageOfNumber(80, 1234));

        expect(result).toEqual(expected);
      });
    });

    describe('when policy type is multi', () => {
      it('should return pecentage of max amount owed', () => {
        const mockSubmittedData = {
          [MAX_AMOUNT_OWED]: 5678,
          [PERCENTAGE_OF_COVER]: 80,
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
        };

        const result = getInsuredFor(mockSubmittedData);
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

    describe('when policy type is multi', () => {
      it('should return the total of credit period + policy length + business buffer months', () => {
        const mockPolicyType = FIELD_VALUES.POLICY_TYPE.MULTI;
        const mockPolicyLength = FIELD_VALUES.POLICY_LENGTH.MULTI;
        const mockCreditPeriod = 2;

        const result = getTotalMonths(mockPolicyType, mockPolicyLength, mockCreditPeriod);

        const expected = mockCreditPeriod + 1;

        expect(result).toEqual(expected);
      });
    });

    describe('when policy type is not single or multi (invalid)', () => {
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

      const expectedTotalMonths = getTotalMonths(mockSubmittedData[POLICY_TYPE], mockSubmittedData[POLICY_LENGTH], mockSubmittedData[CREDIT_PERIOD]);

      const expectedPremiumRate = getPremiumRate(
        mockSubmittedData[POLICY_TYPE],
        mockSubmittedData[BUYER_COUNTRY].riskCategory,
        expectedTotalMonths,
        mockPercentageOfCover,
      );

      const expected = {
        ...getContractValue(mockSubmittedData),
        [PERCENTAGE_OF_COVER]: mockSubmittedData[PERCENTAGE_OF_COVER],
        [QUOTE.INSURED_FOR]: getInsuredFor(mockSubmittedData),
        [QUOTE.BUYER_LOCATION]: mockSubmittedData[BUYER_COUNTRY],
        [CURRENCY]: mockSubmittedData[CURRENCY],
        [CREDIT_PERIOD]: mockSubmittedData[CREDIT_PERIOD],
        [POLICY_TYPE]: mockSubmittedData[POLICY_TYPE],
        [POLICY_LENGTH]: mockSubmittedData[POLICY_LENGTH],
      };

      expected[QUOTE.PREMIUM_RATE_PERCENTAGE] = expectedPremiumRate;

      const contractValueAmount = Object.values(getContractValue(mockSubmittedData))[0];

      expected[QUOTE.ESTIMATED_COST] = calculateEstimatedCost(expectedPremiumRate, contractValueAmount);

      expect(result).toEqual(expected);
    });
  });
});
