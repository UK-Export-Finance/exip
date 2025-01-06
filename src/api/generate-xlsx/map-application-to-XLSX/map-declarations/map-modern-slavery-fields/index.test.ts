import mapModernSlaveryFields from '.';
import DECLARATIONS_FIELD_IDS from '../../../../constants/field-ids/insurance/declarations';
import { DECLARATIONS_FIELDS } from '../../../../content-strings/fields/insurance/declarations';
import xlsxRow from '../../helpers/xlsx-row';
import mapYesNoField from '../../helpers/map-yes-no-field';
import { mockApplication } from '../../../../test-mocks';

const {
  MODERN_SLAVERY: {
    WILL_ADHERE_TO_ALL_REQUIREMENTS,
    HAS_NO_OFFENSES_OR_INVESTIGATIONS,
    IS_NOT_AWARE_OF_EXISTING_SLAVERY,
    CONDITIONAL_REASONS: { CANNOT_ADHERE_TO_ALL_REQUIREMENTS, OFFENSES_OR_INVESTIGATIONS, AWARE_OF_EXISTING_SLAVERY },
  },
} = DECLARATIONS_FIELD_IDS;

const CONTENT_STRINGS = DECLARATIONS_FIELDS.MODERN_SLAVERY;

const {
  declaration: { modernSlavery },
} = mockApplication;

describe('api/generate-xlsx/map-application-to-xlsx/map-declarations/map-modern-slavery-fields', () => {
  it('should return an array of mapped declaratin fields', () => {
    const result = mapModernSlaveryFields(modernSlavery);

    const expected = [
      xlsxRow(CONTENT_STRINGS[WILL_ADHERE_TO_ALL_REQUIREMENTS].SUMMARY.TITLE, mapYesNoField({ answer: modernSlavery[WILL_ADHERE_TO_ALL_REQUIREMENTS] })),
      xlsxRow(CONTENT_STRINGS[WILL_ADHERE_TO_ALL_REQUIREMENTS].CONDITIONAL_REASON.SUMMARY.TITLE, modernSlavery[CANNOT_ADHERE_TO_ALL_REQUIREMENTS]),

      xlsxRow(CONTENT_STRINGS[HAS_NO_OFFENSES_OR_INVESTIGATIONS].SUMMARY.TITLE, mapYesNoField({ answer: modernSlavery[HAS_NO_OFFENSES_OR_INVESTIGATIONS] })),
      xlsxRow(CONTENT_STRINGS[HAS_NO_OFFENSES_OR_INVESTIGATIONS].CONDITIONAL_REASON.SUMMARY.TITLE, modernSlavery[OFFENSES_OR_INVESTIGATIONS]),

      xlsxRow(CONTENT_STRINGS[IS_NOT_AWARE_OF_EXISTING_SLAVERY].SUMMARY.TITLE, mapYesNoField({ answer: modernSlavery[IS_NOT_AWARE_OF_EXISTING_SLAVERY] })),
      xlsxRow(CONTENT_STRINGS[IS_NOT_AWARE_OF_EXISTING_SLAVERY].CONDITIONAL_REASON.SUMMARY.TITLE, modernSlavery[AWARE_OF_EXISTING_SLAVERY]),
    ];

    expect(result).toEqual(expected);
  });
});
