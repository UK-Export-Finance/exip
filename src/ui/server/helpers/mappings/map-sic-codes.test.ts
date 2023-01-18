import mapSicCodes from './map-sic-codes';
import { mockSicCodes } from '../../test-mocks';

describe('server/helpers/mappings/map-sic-codes', () => {
  describe('when sic codes array is populated', () => {
    it('should return an array of sic codes in string format', () => {
      const response = mapSicCodes(mockSicCodes);

      const expected = [mockSicCodes[0].sicCode, mockSicCodes[1].sicCode];

      expect(response).toEqual(expected);
    });
  });
});
