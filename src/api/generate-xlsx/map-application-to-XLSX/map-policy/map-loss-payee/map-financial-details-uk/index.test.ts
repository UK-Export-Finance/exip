import mapLossPayeeFinancialDetailsUk from '.';
import FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import { XLSX } from '../../../../../content-strings';
import xlsxRow from '../../../helpers/xlsx-row';
import mockApplication from '../../../../../test-mocks/mock-application';

const { FIELDS } = XLSX;

const {
  LOSS_PAYEE_DETAILS: { IS_LOCATED_IN_UK },
  LOSS_PAYEE_FINANCIAL_UK: { SORT_CODE, ACCOUNT_NUMBER },
  FINANCIAL_ADDRESS,
} = FIELD_IDS;

describe('api/generate-xlsx/map-application-to-xlsx/map-policy/map-loss-payee/map-financial-details-uk', () => {
  describe('when the loss payee is located in the UK', () => {
    it('should return an array of mapped financial fields', () => {
      const mockLossPayee = {
        ...mockApplication.nominatedLossPayee,
        [IS_LOCATED_IN_UK]: true,
      };

      const result = mapLossPayeeFinancialDetailsUk(mockLossPayee);

      const expected = [
        xlsxRow(String(FIELDS[SORT_CODE]), mockLossPayee.financialUk[SORT_CODE]),
        xlsxRow(String(FIELDS[ACCOUNT_NUMBER]), mockLossPayee.financialUk[ACCOUNT_NUMBER]),
        xlsxRow(String(FIELDS[FINANCIAL_ADDRESS]), mockLossPayee.financialUk[FINANCIAL_ADDRESS]),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('when the loss payee is NOT located in the UK', () => {
    it('should return an empty array', () => {
      const mockLossPayee = {
        ...mockApplication.nominatedLossPayee,
        [IS_LOCATED_IN_UK]: false,
      };

      const result = mapLossPayeeFinancialDetailsUk(mockLossPayee);

      expect(result).toEqual([]);
    });
  });
});
