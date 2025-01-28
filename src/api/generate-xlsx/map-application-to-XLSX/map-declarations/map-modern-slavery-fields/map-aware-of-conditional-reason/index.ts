import DECLARATIONS_FIELD_IDS from '../../../../../constants/field-ids/insurance/declarations';
import { DECLARATIONS_FIELDS } from '../../../../../content-strings/fields/insurance/declarations';
import xlsxRow from '../../../helpers/xlsx-row';
import { ApplicationDeclarationModernSlavery } from '../../../../../types';

const {
  MODERN_SLAVERY: {
    IS_NOT_AWARE_OF_EXISTING_SLAVERY,
    CONDITIONAL_REASONS: { AWARE_OF_EXISTING_SLAVERY: FIELD_ID },
  },
} = DECLARATIONS_FIELD_IDS;

const CONTENT_STRINGS = DECLARATIONS_FIELDS.MODERN_SLAVERY[IS_NOT_AWARE_OF_EXISTING_SLAVERY];

/**
 * mapAwareOfConditionalReason
 * Map an application's "modern slavery declaration - not aware of existing slavery" conditional reason into an object for XLSX generation
 * @param {ApplicationDeclarationModernSlavery} modernSlavery
 * @returns {object} Object for XLSX generation
 */
const mapAwareOfConditionalReason = (modernSlavery: ApplicationDeclarationModernSlavery) => {
  if (modernSlavery[FIELD_ID]) {
    return xlsxRow(CONTENT_STRINGS.CONDITIONAL_REASON.SUMMARY.TITLE, modernSlavery[FIELD_ID]);
  }
};

export default mapAwareOfConditionalReason;
