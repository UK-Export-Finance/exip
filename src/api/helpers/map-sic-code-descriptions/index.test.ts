import mapSicCodeDescriptions from '.';
import mockSectors from '../../test-mocks/mock-industry-sectors';

describe('mapSicCodes', () => {
  let mockSicCodes = [] as Array<string>;

  describe('sic codes and sectors are not empty', () => {
    it('should return an array of descriptions', () => {
      mockSicCodes = ['12345', '98765'];

      const response = mapSicCodeDescriptions(mockSicCodes, mockSectors);

      const expected = ['Test 1 name', 'Test 3 name'];

      expect(response).toEqual(expected);
    });
  });

  describe('sic codes and sectors are not empty but one sic code has no description found', () => {
    it('should return an array of descriptions with one as undefined', () => {
      mockSicCodes = ['2', '98765'];

      const response = mapSicCodeDescriptions(mockSicCodes, mockSectors);

      const expected = [undefined, 'Test 3 name'];

      expect(response).toEqual(expected);
    });
  });

  describe('sic codes is empty', () => {
    it('should return an empty array', () => {
      mockSicCodes = [];

      const response = mapSicCodeDescriptions(mockSicCodes, mockSectors);

      expect(response).toEqual([]);
    });
  });

  describe('sectors is  empty', () => {
    it('should return an empty array', () => {
      mockSicCodes = ['12345', '98765'];

      const response = mapSicCodeDescriptions(mockSicCodes, []);

      expect(response).toEqual([]);
    });
  });
});
