import { generateFields, policyAndExportSummaryList } from '.';
import generatePolicyAndDateFields from './policy-and-date-fields';
import generateCreditPeriodAndCurrencyFields from './credit-period-and-currency-fields';
import generateAboutGoodsOrServicesFields from './about-goods-or-services-fields';
import generateSingleContractPolicyFields from './single-contract-policy-fields';
import generateMultipleContractPolicyFields from './multiple-contract-policy-fields';
import generateSummaryListRows from '../generate-summary-list-rows';
import { mockCountries, mockCurrencies } from '../../../test-mocks';
import { mockSinglePolicyAndExport, mockMultiplePolicyAndExport } from '../../../test-mocks/mock-application';

describe('server/helpers/summary-lists/policy-and-export', () => {
  describe('generateFields', () => {
    describe('when the policy type is single policy type', () => {
      const mockAnswers = mockSinglePolicyAndExport;

      it('should return fields and values from the submitted data/answers', () => {
        const result = generateFields(mockAnswers, mockCountries, mockCurrencies);

        const expected = [
          ...generatePolicyAndDateFields(mockAnswers),
          ...generateSingleContractPolicyFields(mockAnswers),
          ...generateCreditPeriodAndCurrencyFields(mockAnswers, mockCurrencies),
          ...generateAboutGoodsOrServicesFields(mockAnswers, mockCountries),
        ];

        expect(result).toEqual(expected);
      });
    });

    describe('when the policy type is multiple policy type', () => {
      const mockAnswers = mockMultiplePolicyAndExport;

      it('should return fields and values from the submitted data/answers', () => {
        const result = generateFields(mockAnswers, mockCountries, mockCurrencies);

        const expected = [
          ...generatePolicyAndDateFields(mockAnswers),
          ...generateMultipleContractPolicyFields(mockAnswers),
          ...generateCreditPeriodAndCurrencyFields(mockAnswers, mockCurrencies),
          ...generateAboutGoodsOrServicesFields(mockAnswers, mockCountries),
        ];

        expect(result).toEqual(expected);
      });
    });
  });

  describe('policyAndExportSummaryList', () => {
    it('should return an array of summary list rows', () => {
      const mockAnswers = mockSinglePolicyAndExport;

      const result = policyAndExportSummaryList(mockAnswers, mockCountries, mockCurrencies);

      const fields = generateFields(mockAnswers, mockCountries, mockCurrencies);

      const expected = generateSummaryListRows(fields);

      expect(result).toEqual(expected);
    });
  });
});
