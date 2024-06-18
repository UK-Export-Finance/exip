import mapLossPayeeFinancialDetailsInternational from '.';
import FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import { XLSX } from '../../../../../content-strings';
import xlsxRow from '../../../helpers/xlsx-row';
import mockApplication from '../../../../../test-mocks/mock-application';

const { FIELDS } = XLSX;

const {
  LOSS_PAYEE_DETAILS: { IS_LOCATED_INTERNATIONALLY },
  LOSS_PAYEE_FINANCIAL_INTERNATIONAL: { BIC_SWIFT_CODE, IBAN },
  FINANCIAL_ADDRESS,
} = FIELD_IDS;

describe('api/generate-xlsx/map-application-to-xlsx/map-policy/map-loss-payee/map-financial-details-international', () => {
  describe('when the loss payee is located internationally', () => {
    it('should return an array of mapped financial fields', () => {
      const mockLossPayee = {
        ...mockApplication.nominatedLossPayee,
        [IS_LOCATED_INTERNATIONALLY]: true,
      };

      const result = mapLossPayeeFinancialDetailsInternational(mockLossPayee);

      const expected = [
        xlsxRow(String(FIELDS[BIC_SWIFT_CODE]), mockLossPayee.financialInternational[BIC_SWIFT_CODE]),
        xlsxRow(String(FIELDS[IBAN]), mockLossPayee.financialInternational[IBAN]),
        xlsxRow(String(FIELDS[FINANCIAL_ADDRESS]), mockLossPayee.financialInternational[FINANCIAL_ADDRESS]),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('when the loss payee is NOT located internationally', () => {
    it('should return an empty array', () => {
      const mockLossPayee = {
        ...mockApplication.nominatedLossPayee,
        [IS_LOCATED_INTERNATIONALLY]: false,
      };

      const result = mapLossPayeeFinancialDetailsInternational(mockLossPayee);

      expect(result).toEqual([]);
    });
  });
});
