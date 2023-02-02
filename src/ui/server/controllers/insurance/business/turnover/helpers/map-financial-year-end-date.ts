import formatDate from '../../../../../helpers/date/format-date';
import { FIELD_IDS } from '../../../../../constants';
import { FIELDS } from '../../../../../content-strings/fields/insurance/your-business';

const { FINANCIAL_YEAR_END_DATE } = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.TURNOVER;

const {
  TURNOVER: {
    [FINANCIAL_YEAR_END_DATE]: { DATE_FORMAT },
  },
} = FIELDS;

const mapFinancialYearEndDate = (financialYearEndDate?: Date) => (financialYearEndDate ? formatDate(financialYearEndDate, DATE_FORMAT) : null);

export default mapFinancialYearEndDate;
