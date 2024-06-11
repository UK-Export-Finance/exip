import FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import { XLSX } from '../../../../../content-strings';
import xlsxRow from '../../../helpers/xlsx-row';
import { ApplicationNominatedLossPayee } from '../../../../../types';

const { FIELDS } = XLSX;

const {
  LOSS_PAYEE_DETAILS: { IS_LOCATED_IN_UK },
  LOSS_PAYEE_FINANCIAL_UK: { SORT_CODE, ACCOUNT_NUMBER },
  FINANCIAL_ADDRESS,
} = FIELD_IDS;

/**
 * mapLossPayeeFinancialDetailsUk
 * If an application has a loss payee that is located in the UK,
 * Map the fields into an array of objects for XLSX generation
 * @param {ApplicationNominatedLossPayee} lossPayee
 * @returns {Array<object>} Array of objects for XLSX generation
 */
const mapLossPayeeFinancialDetailsUk = (lossPayee: ApplicationNominatedLossPayee) => {
  if (lossPayee[IS_LOCATED_IN_UK]) {
    const mapped = [
      xlsxRow(String(FIELDS[SORT_CODE]), lossPayee.financialUk[SORT_CODE]),
      xlsxRow(String(FIELDS[ACCOUNT_NUMBER]), lossPayee.financialUk[ACCOUNT_NUMBER]),
      xlsxRow(String(FIELDS[FINANCIAL_ADDRESS]), lossPayee.financialUk[FINANCIAL_ADDRESS]),
    ];

    return mapped;
  }

  return [];
};

export default mapLossPayeeFinancialDetailsUk;
