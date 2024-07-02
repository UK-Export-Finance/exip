import xlsxRow from '.';
import { XLSX_CONFIG } from '../../../../constants';
import replaceCharacterCodesWithCharacters from '../../../../helpers/replace-character-codes-with-characters';

const { KEY, VALUE } = XLSX_CONFIG;

describe('api/generate-xlsx/map-application-to-xlsx/helpers/xlsx-row', () => {
  const mockFieldName = 'Field A';
  const mockFieldAnswer = 'Mock answer';

  it('should return an object with field and answer properties', () => {
    const result = xlsxRow(mockFieldName, mockFieldAnswer);

    const expected = {
      [KEY]: mockFieldName,
      [VALUE]: replaceCharacterCodesWithCharacters(mockFieldAnswer),
    };

    expect(result).toEqual(expected);
  });

  describe('when answer is 0', () => {
    it('should return the answer as a string', () => {
      const result = xlsxRow(mockFieldName, 0);

      const expected = {
        [KEY]: mockFieldName,
        [VALUE]: replaceCharacterCodesWithCharacters(String(0)),
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when answer is undefined', () => {
    it('should return an empty string', () => {
      const result = xlsxRow(mockFieldName);

      const expected = {
        [KEY]: mockFieldName,
        [VALUE]: replaceCharacterCodesWithCharacters(''),
      };

      expect(result).toEqual(expected);
    });
  });
});
