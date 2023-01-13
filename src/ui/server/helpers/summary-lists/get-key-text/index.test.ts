import getKeyText from '.';
import { FIELD_IDS } from '../../../constants';
import { FIELDS } from '../../../content-strings';

const { VALID_EXPORTER_LOCATION } = FIELD_IDS;

describe('server/helpers/summary-lists/get-key-text', () => {
  describe('getKeyText', () => {
    describe('when a field has SUMMARY objct', () => {
      const fieldId = VALID_EXPORTER_LOCATION;

      it('should return FIELD.SUMMARY.TITLE', () => {
        const result = getKeyText(FIELDS, fieldId);

        const expected = FIELDS[VALID_EXPORTER_LOCATION].SUMMARY?.TITLE;
        expect(result).toEqual(expected);
      });
    });
  });
});
