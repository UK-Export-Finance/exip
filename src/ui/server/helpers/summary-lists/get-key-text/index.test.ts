import getKeyText from '.';
import { FIELD_IDS } from '../../../constants';
import { FIELDS } from '../../../content-strings';

const {
  ELIGIBILITY: { AMOUNT_CURRENCY, VALID_EXPORTER_LOCATION },
} = FIELD_IDS;

describe('server/helpers/summary-lists/get-key-text', () => {
  describe('getKeyText', () => {
    describe('when a field has SUMMARY object with TITLE', () => {
      it('should return FIELD.SUMMARY.TITLE', () => {
        const result = getKeyText({
          id: 'mock',
          ...FIELDS[VALID_EXPORTER_LOCATION],
        });

        const expected = FIELDS[VALID_EXPORTER_LOCATION].SUMMARY?.TITLE;
        expect(result).toEqual(expected);
      });
    });

    describe('when a field has title property', () => {
      it('should return title', () => {
        const mockField = { id: 'mock', title: 'mock field' };

        const result = getKeyText(mockField);

        expect(result).toEqual(mockField.title);
      });
    });

    describe('when a field does not have SUMMARY object or title property', () => {
      it('should return null', () => {
        const fieldIdWithoutSummary = {
          id: 'mock',
          ...FIELDS[AMOUNT_CURRENCY],
        };

        const result = getKeyText(fieldIdWithoutSummary);

        expect(result).toEqual(null);
      });
    });
  });
});
