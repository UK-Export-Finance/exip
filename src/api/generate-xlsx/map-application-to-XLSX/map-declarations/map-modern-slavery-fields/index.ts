import DECLARATIONS_FIELD_IDS from '../../../../constants/field-ids/insurance/declarations';
import { DECLARATIONS_FIELDS } from '../../../../content-strings/fields/insurance/declarations';
import xlsxRow from '../../helpers/xlsx-row';
import mapYesNoField from '../../helpers/map-yes-no-field';
import mapCannotAdhereConditionalReason from './map-cannot-adhere-conditional-reason';
import mapOffensesConditionalReason from './map-offenses-conditional-reason';
import mapAwareOfConditionalReason from './map-aware-of-conditional-reason';
import { ApplicationDeclarationModernSlavery } from '../../../../types';

const {
  MODERN_SLAVERY: { WILL_ADHERE_TO_ALL_REQUIREMENTS, HAS_NO_OFFENSES_OR_INVESTIGATIONS, IS_NOT_AWARE_OF_EXISTING_SLAVERY },
} = DECLARATIONS_FIELD_IDS;

const CONTENT_STRINGS = DECLARATIONS_FIELDS.MODERN_SLAVERY;

const WILL_ADHERE_TO_ALL_REQUIREMENTS_STRINGS = CONTENT_STRINGS[WILL_ADHERE_TO_ALL_REQUIREMENTS];
const HAS_NO_OFFENSES_OR_INVESTIGATIONS_STRINGS = CONTENT_STRINGS[HAS_NO_OFFENSES_OR_INVESTIGATIONS];
const IS_NOT_AWARE_OF_EXISTING_SLAVERY_STRINGS = CONTENT_STRINGS[IS_NOT_AWARE_OF_EXISTING_SLAVERY];

/**
 * mapModernSlaveryFields
 * Map an application's "modern slavery declaration" fields into an array of objects for XLSX generation
 * @param {ApplicationDeclarationModernSlavery} modernSlavery
 * @returns {Array<object>} Array of objects for XLSX generation
 */
const mapModernSlaveryFields = (modernSlavery: ApplicationDeclarationModernSlavery) => {
  const mapped = [
    xlsxRow(WILL_ADHERE_TO_ALL_REQUIREMENTS_STRINGS.SUMMARY.TITLE, mapYesNoField({ answer: modernSlavery[WILL_ADHERE_TO_ALL_REQUIREMENTS] })),
    mapCannotAdhereConditionalReason(modernSlavery),
    xlsxRow(HAS_NO_OFFENSES_OR_INVESTIGATIONS_STRINGS.SUMMARY.TITLE, mapYesNoField({ answer: modernSlavery[HAS_NO_OFFENSES_OR_INVESTIGATIONS] })),
    mapOffensesConditionalReason(modernSlavery),
    xlsxRow(IS_NOT_AWARE_OF_EXISTING_SLAVERY_STRINGS.SUMMARY.TITLE, mapYesNoField({ answer: modernSlavery[IS_NOT_AWARE_OF_EXISTING_SLAVERY] })),
    mapAwareOfConditionalReason(modernSlavery),
  ];

  return mapped;
};

export default mapModernSlaveryFields;
