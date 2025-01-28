import mapOffensesConditionalReason from '.';
import DECLARATIONS_FIELD_IDS from '../../../../../constants/field-ids/insurance/declarations';
import { DECLARATIONS_FIELDS } from '../../../../../content-strings/fields/insurance/declarations';
import xlsxRow from '../../../helpers/xlsx-row';
import { mockApplication } from '../../../../../test-mocks';

const {
  MODERN_SLAVERY: {
    HAS_NO_OFFENSES_OR_INVESTIGATIONS,
    CONDITIONAL_REASONS: { OFFENSES_OR_INVESTIGATIONS: FIELD_ID },
  },
} = DECLARATIONS_FIELD_IDS;

const CONTENT_STRINGS = DECLARATIONS_FIELDS.MODERN_SLAVERY[HAS_NO_OFFENSES_OR_INVESTIGATIONS];

const {
  declaration: { modernSlavery },
} = mockApplication;

describe('api/generate-xlsx/map-application-to-xlsx/map-declarations/map-modern-slavery-fields/map-offenses-conditional-reason', () => {
  describe(`when ${FIELD_ID} is populated`, () => {
    it('should return one field', () => {
      const mockModernSlavery = {
        ...modernSlavery,
        [FIELD_ID]: 'mock',
      };

      const result = mapOffensesConditionalReason(mockModernSlavery);

      const expected = xlsxRow(CONTENT_STRINGS.CONDITIONAL_REASON.SUMMARY.TITLE, mockModernSlavery[FIELD_ID]);

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FIELD_ID} is NOT populated`, () => {
    it('should return undefined', () => {
      const mockModernSlavery = {
        ...modernSlavery,
        [FIELD_ID]: '',
      };

      const result = mapOffensesConditionalReason(mockModernSlavery);

      expect(result).toBeUndefined();
    });
  });
});
