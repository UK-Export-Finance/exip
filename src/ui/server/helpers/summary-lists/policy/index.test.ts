import { generateFields, policySummaryList } from '.';
import generatePolicyAndDateFields from './policy-and-date-fields';
import generateCreditPeriodAndCurrencyFields from './credit-period-and-currency-fields';
import generateAboutGoodsOrServicesFields from './about-goods-or-services-fields';
import generateSingleContractPolicyFields from './single-contract-policy-fields';
import generateMultipleContractPolicyFields from './multiple-contract-policy-fields';
import generatePolicyContactFields from './policy-contact-fields';
import generateSummaryListRows from '../generate-summary-list-rows';
import { mockCountries, mockCurrencies, mockContact } from '../../../test-mocks';
import mockApplication, { mockSinglePolicy, mockMultiplePolicy } from '../../../test-mocks/mock-application';

describe('server/helpers/summary-lists/policy', () => {
  const { referenceNumber } = mockApplication;
  const checkAndChange = false;

  describe('generateFields', () => {
    describe('when the policy type is single policy type', () => {
      const mockAnswers = mockSinglePolicy;

      it('should return fields and values from the submitted data/answers', () => {
        const result = generateFields(mockAnswers, mockContact, referenceNumber, mockCountries, mockCurrencies, checkAndChange);

        const expected = [
          ...generatePolicyAndDateFields(mockAnswers, referenceNumber, checkAndChange),
          ...generateSingleContractPolicyFields(mockAnswers, referenceNumber, checkAndChange),
          ...generateCreditPeriodAndCurrencyFields(mockAnswers, referenceNumber, mockCurrencies, checkAndChange),
          ...generateAboutGoodsOrServicesFields(mockAnswers, referenceNumber, mockCountries, checkAndChange),
          ...generatePolicyContactFields(mockContact, referenceNumber, checkAndChange),
        ];

        expect(result).toEqual(expected);
      });
    });

    describe('when the policy type is multiple policy type', () => {
      const mockAnswers = mockMultiplePolicy;

      it('should return fields and values from the submitted data/answers', () => {
        const result = generateFields(mockAnswers, mockContact, referenceNumber, mockCountries, mockCurrencies, checkAndChange);

        const expected = [
          ...generatePolicyAndDateFields(mockAnswers, referenceNumber, checkAndChange),
          ...generateMultipleContractPolicyFields(mockAnswers, referenceNumber, checkAndChange),
          ...generateCreditPeriodAndCurrencyFields(mockAnswers, referenceNumber, mockCurrencies, checkAndChange),
          ...generateAboutGoodsOrServicesFields(mockAnswers, referenceNumber, mockCountries, checkAndChange),
          ...generatePolicyContactFields(mockContact, referenceNumber, checkAndChange),
        ];

        expect(result).toEqual(expected);
      });
    });
  });

  describe('policySummaryList', () => {
    const mockAnswers = mockSinglePolicy;

    it('should return an array of summary list rows', () => {
      const result = policySummaryList(mockAnswers, mockContact, referenceNumber, mockCountries, mockCurrencies);

      const fields = generateFields(mockAnswers, mockContact, referenceNumber, mockCountries, mockCurrencies, checkAndChange);

      const expected = generateSummaryListRows(fields);

      expect(result).toEqual(expected);
    });
  });
});
