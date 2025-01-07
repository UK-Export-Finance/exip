import mapModernSlaveryFields from '.';
import DECLARATIONS_FIELD_IDS from '../../../../constants/field-ids/insurance/declarations';
import { DECLARATIONS_FIELDS } from '../../../../content-strings/fields/insurance/declarations';
import xlsxRow from '../../helpers/xlsx-row';
import mapYesNoField from '../../helpers/map-yes-no-field';
import mapCannotAdhereConditionalReason from './map-cannot-adhere-conditional-reason';
import mapOffensesConditionalReason from './map-offenses-conditional-reason';
import mapAwareOfConditionalReason from './map-aware-of-conditional-reason';
import { mockApplication } from '../../../../test-mocks';

const {
  MODERN_SLAVERY: { WILL_ADHERE_TO_ALL_REQUIREMENTS, HAS_NO_OFFENSES_OR_INVESTIGATIONS, IS_NOT_AWARE_OF_EXISTING_SLAVERY },
} = DECLARATIONS_FIELD_IDS;

const CONTENT_STRINGS = DECLARATIONS_FIELDS.MODERN_SLAVERY;

const {
  declaration: { modernSlavery },
} = mockApplication;

describe('api/generate-xlsx/map-application-to-xlsx/map-declarations/map-modern-slavery-fields', () => {
  it('should return an array of mapped declaration fields', () => {
    const result = mapModernSlaveryFields(modernSlavery);

    const expected = [
      xlsxRow(CONTENT_STRINGS[WILL_ADHERE_TO_ALL_REQUIREMENTS].SUMMARY.TITLE, mapYesNoField({ answer: modernSlavery[WILL_ADHERE_TO_ALL_REQUIREMENTS] })),
      mapCannotAdhereConditionalReason(modernSlavery),

      xlsxRow(CONTENT_STRINGS[HAS_NO_OFFENSES_OR_INVESTIGATIONS].SUMMARY.TITLE, mapYesNoField({ answer: modernSlavery[HAS_NO_OFFENSES_OR_INVESTIGATIONS] })),
      mapOffensesConditionalReason(modernSlavery),

      xlsxRow(CONTENT_STRINGS[IS_NOT_AWARE_OF_EXISTING_SLAVERY].SUMMARY.TITLE, mapYesNoField({ answer: modernSlavery[IS_NOT_AWARE_OF_EXISTING_SLAVERY] })),
      mapAwareOfConditionalReason(modernSlavery),
    ];

    expect(result).toEqual(expected);
  });
});
