import styledColumns, { getAdditionalRowHeightIndexes } from '.';
import XLSX_ROW_INDEXES from '../../constants/XLSX-CONFIG/INDEXES';
import modifyRowStyles from './modify-row-styles';
import modifyRowHeights from './modify-row-heights';
import { mockApplicationMinimalBrokerBuyerAndCompany as mockApplication } from '../../test-mocks';
import createMockWorksheet from '../../test-mocks/create-mock-worksheet';

describe('api/generate-xlsx/styled-columns/index', () => {
  const { mockWorksheet, mockSheetName } = createMockWorksheet();

  describe('getAdditionalRowHeightIndexes', () => {
    describe('when a provided sheetName is in XLSX_ROW_INDEXES', () => {
      it('should return index values', () => {
        const result = getAdditionalRowHeightIndexes(mockApplication, mockSheetName);

        const sheetIndexes = XLSX_ROW_INDEXES[mockSheetName](mockApplication);

        const expected = Object.values(sheetIndexes);

        expect(result).toEqual(expected);
      });
    });

    describe('when a provided sheetName is NOT in XLSX_ROW_INDEXES', () => {
      it('should return an empty array', () => {
        const result = getAdditionalRowHeightIndexes(mockApplication, 'invalid sheet name');

        expect(result).toEqual([]);
      });
    });
  });

  describe('styledColumns', () => {
    it('should return a modified worksheet', async () => {
      const result = styledColumns(mockApplication, mockWorksheet, mockSheetName);

      const modifiedRowStyles = modifyRowStyles(mockWorksheet, mockSheetName);

      const indexes = getAdditionalRowHeightIndexes(mockApplication, mockSheetName);

      const expected = modifyRowHeights(indexes, modifiedRowStyles, mockSheetName);

      expect(result).toEqual(expected);
    });
  });
});
