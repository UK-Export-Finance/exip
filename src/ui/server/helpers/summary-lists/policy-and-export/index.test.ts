import { generateFields, policyAndExportSummaryList } from '.';
import generatePolicyAndDateFields from './policy-and-date-fields';
import generateCreditPeriodAndCurrencyFields from './credit-period-and-currency-fields';
import generateAboutGoodsOrServicesFields from './about-goods-or-services-fields';
import generateSingleContractPolicyFields from './single-contract-policy-fields';
import generateMultipleContractPolicyFields from './multiple-contract-policy-fields';
import generateSummaryListRows from '../generate-summary-list-rows';
import { mockCountries, mockCurrencies } from '../../../test-mocks';
import mockApplication, { mockSinglePolicyAndExport, mockMultiplePolicyAndExport } from '../../../test-mocks/mock-application';

describe('server/helpers/summary-lists/policy-and-export', () => {
  const { referenceNumber } = mockApplication;

  describe('generateFields', () => {
    describe('when the policy type is single policy type', () => {
      const mockAnswers = mockSinglePolicyAndExport;

      it('should return fields and values from the submitted data/answers', () => {
        const result = generateFields(mockAnswers, referenceNumber, mockCountries, mockCurrencies);

        const expected = [
          ...generatePolicyAndDateFields(mockAnswers, referenceNumber),
          ...generateSingleContractPolicyFields(mockAnswers, referenceNumber),
          ...generateCreditPeriodAndCurrencyFields(mockAnswers, referenceNumber, mockCurrencies),
          ...generateAboutGoodsOrServicesFields(mockAnswers, referenceNumber, mockCountries),
        ];

        expect(result).toEqual(expected);
      });
    });

    describe('when the policy type is multiple policy type', () => {
      const mockAnswers = mockMultiplePolicyAndExport;

      it('should return fields and values from the submitted data/answers', () => {
        const result = generateFields(mockAnswers, referenceNumber, mockCountries, mockCurrencies);

        const expected = [
          ...generatePolicyAndDateFields(mockAnswers, referenceNumber),
          ...generateMultipleContractPolicyFields(mockAnswers, referenceNumber),
          ...generateCreditPeriodAndCurrencyFields(mockAnswers, referenceNumber, mockCurrencies),
          ...generateAboutGoodsOrServicesFields(mockAnswers, referenceNumber, mockCountries),
        ];

        expect(result).toEqual(expected);
      });
    });
  });

  describe('policyAndExportSummaryList', () => {
    const mockAnswers = mockSinglePolicyAndExport;

    it('should return an array of summary list rows', () => {
      const result = policyAndExportSummaryList(mockAnswers, referenceNumber, mockCountries, mockCurrencies);

      const fields = generateFields(mockAnswers, referenceNumber, mockCountries, mockCurrencies);

      const expected = generateSummaryListRows(fields);

      expect(result).toEqual(expected);
    });
  });
});
