import FIELD_IDS from '../../../../constants/field-ids/insurance/business';
import { XLSX } from '../../../../content-strings';
import xlsxRow from '../../helpers/xlsx-row';
import { ApplicationCompany } from '../../../../types';

const {
  ALTERNATIVE_TRADING_ADDRESS: { FULL_ADDRESS, FULL_ADDRESS_DOT_NOTATION },
} = FIELD_IDS;

const { FIELDS } = XLSX;

/**
 * mapDifferentTradingAddress
 * Generate an XLSX row if a company has a "different trading address" value.
 * @param {ApplicationCompany} company: Application company
 * @returns {Object | undefined} xlsxRow
 */
const mapDifferentTradingAddress = (company: ApplicationCompany) => {
  const { differentTradingAddress } = company;

  const differentTradingAddressValue = differentTradingAddress[FULL_ADDRESS];

  if (differentTradingAddressValue) {
    return xlsxRow(String(FIELDS[FULL_ADDRESS_DOT_NOTATION]), differentTradingAddressValue);
  }
};

export default mapDifferentTradingAddress;
