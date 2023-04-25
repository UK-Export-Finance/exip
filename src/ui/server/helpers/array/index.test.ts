import { isPopulatedArray, stringArrayHasValue } from '.';

describe('server/helpers/array', () => {
  describe('isPopulatedArray', () => {
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

  describe('stringArrayHasValue', () => {
    describe('when an array is populated at the index', () => {
      it('should return true at index 0', () => {
        const mockArray = ['test', 'test2'];

        const result = stringArrayHasValue(0, mockArray);

        expect(result).toEqual(true);
      });

      it('should return true at index 1', () => {
        const mockArray = ['test', 'test2'];

        const result = stringArrayHasValue(1, mockArray);

        expect(result).toEqual(true);
      });

      it('should return false at index 2', () => {
        const mockArray = ['test', 'test2'];

        const result = stringArrayHasValue(2, mockArray);

        expect(result).toEqual(false);
      });
    });

    describe('when an array is not provided', () => {
      it('should return false', () => {
        const result = stringArrayHasValue(0);

        expect(result).toEqual(false);
      });
    });

    describe('when the array is empty', () => {
      it('should return false', () => {
        const result = stringArrayHasValue(0, []);

        expect(result).toEqual(false);
      });
    });
  });
});
