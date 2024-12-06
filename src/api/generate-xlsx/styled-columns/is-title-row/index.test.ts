import isTitleRow from '.';
import SECTION_NAMES from '../../../constants/XLSX-CONFIG/SECTION_NAMES';
import APPLICATION_INFORMATION_INDEXES from '../../../constants/XLSX-CONFIG/INDEXES/APPLICATION_INFORMATION';

const { APPLICATION_INFORMATION } = SECTION_NAMES;
const { EXPORTER_CONTACT_DETAILS, KEY_INFORMATION } = APPLICATION_INFORMATION_INDEXES;

describe('api/generate-xlsx/styled-columns/is-title-row', () => {
  describe(`when the sheetName is ${APPLICATION_INFORMATION}`, () => {
    const mockSheetName = APPLICATION_INFORMATION;

    describe(`when rowNumber=${EXPORTER_CONTACT_DETAILS}`, () => {
      it('should return true', () => {
        const result = isTitleRow(mockSheetName, EXPORTER_CONTACT_DETAILS);

        expect(result).toEqual(true);
      });
    });

    describe(`when rowNumber=${KEY_INFORMATION}`, () => {
      it('should return true', () => {
        const result = isTitleRow(mockSheetName, KEY_INFORMATION);

        expect(result).toEqual(true);
      });
    });

    describe('when rowNumber is NOT 8 or 13', () => {
      it('should return false', () => {
        const result = isTitleRow(mockSheetName, 5);

        expect(result).toEqual(false);
      });
    });
  });

  describe(`when the sheetName is NOT ${APPLICATION_INFORMATION}`, () => {
    const mockSheetName = 'Mock sheet name';

    describe('when rowNumber=1', () => {
      it('should return true', () => {
        const result = isTitleRow(mockSheetName, 1);

        expect(result).toEqual(true);
      });
    });

    describe('when rowNumber is NOT 1', () => {
      it('should return false', () => {
        const result = isTitleRow(mockSheetName, 5);

        expect(result).toEqual(false);
      });
    });
  });
});
