import { generateFields, policyAndExportSummaryList } from '.';
import generatePolicyAndDateFields from './policy-and-date-fields';
import generateCreditPeriodAndCurrencyFields from './credit-period-and-currency-fields';
import generateAboutGoodsOrServicesFields from './about-goods-or-services-fields';
import generateSingleContractPolicyFields from './single-contract-policy-fields';
import generateMultipleContractPolicyFields from './multiple-contract-policy-fields';
import generateSummaryListRows from '../generate-summary-list-rows';
import { mockCountries, mockCurrencies } from '../../../test-mocks';
import mockApplication, { mockSinglePolicy, mockMultiplePolicy } from '../../../test-mocks/mock-application';

describe('server/helpers/summary-lists/policy-and-export', () => {
  const { referenceNumber } = mockApplication;
  const checkAndChange = false;

  describe('generateFields', () => {
    describe('when the policy type is single policy type', () => {
      const mockAnswers = mockSinglePolicy;

      it('should return fields and values from the submitted data/answers', () => {
        const result = generateFields(mockAnswers, referenceNumber, mockCountries, mockCurrencies, checkAndChange);

        const expected = [
          ...generatePolicyAndDateFields(mockAnswers, referenceNumber, checkAndChange),
          ...generateSingleContractPolicyFields(mockAnswers, referenceNumber, checkAndChange),
          ...generateCreditPeriodAndCurrencyFields(mockAnswers, referenceNumber, mockCurrencies, checkAndChange),
          ...generateAboutGoodsOrServicesFields(mockAnswers, referenceNumber, mockCountries, checkAndChange),
        ];

        expect(result).toEqual(expected);
      });
    });

    describe('when the policy type is multiple policy type', () => {
      const mockAnswers = mockMultiplePolicy;

      it('should return fields and values from the submitted data/answers', () => {
        const result = generateFields(mockAnswers, referenceNumber, mockCountries, mockCurrencies, checkAndChange);

        const expected = [
          ...generatePolicyAndDateFields(mockAnswers, referenceNumber, checkAndChange),
          ...generateMultipleContractPolicyFields(mockAnswers, referenceNumber, checkAndChange),
          ...generateCreditPeriodAndCurrencyFields(mockAnswers, referenceNumber, mockCurrencies, checkAndChange),
          ...generateAboutGoodsOrServicesFields(mockAnswers, referenceNumber, mockCountries, checkAndChange),
        ];

        expect(result).toEqual(expected);
      });
    });
  });

  describe('policyAndExportSummaryList', () => {
    const mockAnswers = mockSinglePolicy;

    it('should return an array of summary list rows', () => {
      const result = policyAndExportSummaryList(mockAnswers, referenceNumber, mockCountries, mockCurrencies);

      const fields = generateFields(mockAnswers, referenceNumber, mockCountries, mockCurrencies, checkAndChange);

      const expected = generateSummaryListRows(fields);

      expect(result).toEqual(expected);
    });
  });
});
