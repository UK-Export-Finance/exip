import DECLARATIONS_FIELD_IDS from '../../../../../constants/field-ids/insurance/declarations';
import { DECLARATIONS_FIELDS } from '../../../../../content-strings/fields/insurance/declarations';
import xlsxRow from '../../../helpers/xlsx-row';
import { ApplicationDeclarationModernSlavery } from '../../../../../types';

const {
  MODERN_SLAVERY: {
    WILL_ADHERE_TO_ALL_REQUIREMENTS,
    CONDITIONAL_REASONS: { CANNOT_ADHERE_TO_ALL_REQUIREMENTS: FIELD_ID },
  },
} = DECLARATIONS_FIELD_IDS;

const CONTENT_STRINGS = DECLARATIONS_FIELDS.MODERN_SLAVERY[WILL_ADHERE_TO_ALL_REQUIREMENTS];

/**
 * mapCannotAdhereConditionalReason
 * Map an application's "modern slavery declaration - cannot adhere" conditional reason into an object for XLSX generation
 * @param {ApplicationDeclarationModernSlavery} modernSlavery
 * @returns {object} Object for XLSX generation
 */
const mapCannotAdhereConditionalReason = (modernSlavery: ApplicationDeclarationModernSlavery) => {
  if (modernSlavery[FIELD_ID]) {
    return xlsxRow(CONTENT_STRINGS.CONDITIONAL_REASON.SUMMARY.TITLE, modernSlavery[FIELD_ID]);
  }
};

export default mapCannotAdhereConditionalReason;
