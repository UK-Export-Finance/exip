import { DATE_FORMAT } from '../../../../constants';
import FIELD_IDS from '../../../../constants/field-ids/insurance/business';
import { XLSX } from '../../../../content-strings';
import formatDate from '../../../../helpers/format-date';
import { ApplicationCompany } from '../../../../types';

const {
  COMPANIES_HOUSE: { FINANCIAL_YEAR_END_DATE },
} = FIELD_IDS;

const { FIELDS } = XLSX;

/**
 * mapFinancialYearEndDate
 * financial year end date should only be populated if it exists.
 * Otherwise, return default text.
 * @param {ApplicationCompany} company: Application company
 * @returns {String}
 */
const mapFinancialYearEndDate = (company: ApplicationCompany) => {
  if (company[FINANCIAL_YEAR_END_DATE]) {
    return formatDate(company[FINANCIAL_YEAR_END_DATE], DATE_FORMAT.XLSX);
  }

  return FIELDS.NO_FINANCIAL_YEAR_END_DATE;
};

export default mapFinancialYearEndDate;
