import { isEmptyString } from '.';

describe('api/helpers/string', () => {
  describe('isEmptyString', () => {
    describe('when a string is empty', () => {
      it('should return true', () => {
        const result = isEmptyString('');

        expect(result).toEqual(true);
      });
    });

    describe('when a string is not empty', () => {
      it('should return false', () => {
        const result = isEmptyString('Mock');

        expect(result).toEqual(false);
      });
    });
  });
});
