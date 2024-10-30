import styledColumns, { getAdditionalRowHeightIndexes } from '.';
import modifyRowStyles from './modify-row-styles';
import modifyRowHeights from './modify-row-heights';
import { mockApplicationMinimalBrokerBuyerAndCompany as mockApplication, createMockWorksheet } from '../../test-mocks';

describe('api/generate-xlsx/styled-columns/index', () => {
  const { mockWorksheet, mockSheetName } = createMockWorksheet();

  it('should return a modified worksheet', async () => {
    const result = styledColumns(mockApplication, mockWorksheet, mockSheetName);

    const modifiedRowStyles = modifyRowStyles(mockWorksheet, mockSheetName);

    const indexes = getAdditionalRowHeightIndexes(mockApplication, mockSheetName);

    const expected = modifyRowHeights(indexes, modifiedRowStyles, mockSheetName);

    expect(result).toEqual(expected);
  });
});
