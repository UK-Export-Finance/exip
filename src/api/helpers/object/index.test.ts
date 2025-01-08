import { objectHasKeysAndValues } from '.';

describe('api/helpers/object', () => {
  describe('objectHasKeysAndValues', () => {
    describe('when an object has keys and values', () => {
      it('should return true', () => {
        const result = objectHasKeysAndValues({ a: true });

        expect(result).toEqual(true);
      });
    });

    describe('when an object has keys, but no values', () => {
      it('should return false', () => {
        const result = objectHasKeysAndValues({ a: null });

        expect(result).toEqual(false);
      });
    });

    describe('when an object is empty', () => {
      it('should return false', () => {
        const result = objectHasKeysAndValues({});

        expect(result).toEqual(false);
      });
    });
  });
});
