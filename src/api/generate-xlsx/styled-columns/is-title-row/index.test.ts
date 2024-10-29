import isTitleRow from '.';
import SECTION_NAMES from '../../../constants/XLSX-CONFIG/SECTION_NAMES';

const { APPLICATION_INFORMATION } = SECTION_NAMES;

describe('api/generate-xlsx/styled-columns/is-title-row', () => {
  describe(`when the sheetName is ${APPLICATION_INFORMATION}`, () => {
    const mockSheetName = APPLICATION_INFORMATION;

    describe('when rowNumber=8', () => {
      it('should return true', () => {
        const result = isTitleRow(mockSheetName, 8);

        expect(result).toEqual(true);
      });
    });

    describe('when rowNumber=13', () => {
      it('should return true', () => {
        const result = isTitleRow(mockSheetName, 13);

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

  describe(`when the sheetName is NOT ${APPLICATION_INFORMATION}, rowNumber=1`, () => {
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
