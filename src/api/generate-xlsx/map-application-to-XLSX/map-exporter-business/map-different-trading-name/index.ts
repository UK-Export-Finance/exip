import FIELD_IDS from '../../../../constants/field-ids/insurance/business';
import { XLSX } from '../../../../content-strings';
import xlsxRow from '../../helpers/xlsx-row';
import { ApplicationCompany } from '../../../../types';

const {
  YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME, DIFFERENT_TRADING_NAME },
} = FIELD_IDS;

const { FIELDS } = XLSX;

/**
 * mapDifferentTradingName
 * Generate an XLSX row if a company has a "different trading name" value.
 * @param {ApplicationCompany} company: Application company
 * @returns {Object | undefined} xlsxRow
 */
const mapDifferentTradingName = (company: ApplicationCompany) => {
  if (company[HAS_DIFFERENT_TRADING_NAME]) {
    return xlsxRow(String(FIELDS[DIFFERENT_TRADING_NAME]), company[DIFFERENT_TRADING_NAME]);
  }
};

export default mapDifferentTradingName;
