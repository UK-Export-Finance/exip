import isPopulatedArray from '.';

describe('server/helpers/is-populated-array', () => {
  describe('when an array is populated', () => {
    it('should return true', () => {
      const mockArray = [{ workId: 1 }, { workId: 2 }];

      const result = isPopulatedArray(mockArray);

      expect(result).toEqual(true);
    });
  });

  describe('when an array is not provided', () => {
    it('should return false', () => {
      const result = isPopulatedArray();

      expect(result).toEqual(false);
    });
  });

  describe('when the array is empty', () => {
    it('should return false', () => {
      const result = isPopulatedArray([]);

      expect(result).toEqual(false);
    });
  });

  describe('when an object is passed', () => {
    it('should return false', () => {
      // @ts-ignore
      const result = isPopulatedArray({});

      expect(result).toEqual(false);
    });
  });
});
