import FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import { XLSX } from '../../../../../content-strings';
import xlsxRow from '../../../helpers/xlsx-row';
import { ApplicationNominatedLossPayee } from '../../../../../types';

const { FIELDS } = XLSX;

const {
  LOSS_PAYEE_DETAILS: { IS_LOCATED_INTERNATIONALLY },
  LOSS_PAYEE_FINANCIAL_INTERNATIONAL: { BIC_SWIFT_CODE, IBAN },
  FINANCIAL_ADDRESS,
} = FIELD_IDS;

/**
 * mapLossPayeeFinancialDetailsInternational
 * If an application has a loss payee that is located internationally,
 * Map the fields into an array of objects for XLSX generation
 * @param {ApplicationNominatedLossPayee} lossPayee
 * @returns {Array<object>} Array of objects for XLSX generation
 */
const mapLossPayeeFinancialDetailsInternational = (lossPayee: ApplicationNominatedLossPayee) => {
  if (lossPayee[IS_LOCATED_INTERNATIONALLY]) {
    const mapped = [
      xlsxRow(String(FIELDS[BIC_SWIFT_CODE]), lossPayee.financialInternational[BIC_SWIFT_CODE]),
      xlsxRow(String(FIELDS[IBAN]), lossPayee.financialInternational[IBAN]),
      xlsxRow(String(FIELDS[FINANCIAL_ADDRESS]), lossPayee.financialInternational[FINANCIAL_ADDRESS]),
    ];

    return mapped;
  }

  return [];
};

export default mapLossPayeeFinancialDetailsInternational;
