import { objectHasKeysAndValues, objectHasProperty } from '.';

describe('server/helpers/object', () => {
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

  describe('objectHasProperty', () => {
    describe('when the object contains the provided property', () => {
      it('should return true', () => {
        const mockObject = { test: 'testing' };

        const result = objectHasProperty(mockObject, 'test');
        expect(result).toEqual(true);
      });
    });

    describe('when the object does NOT contain the provided property', () => {
      it('should return false', () => {
        const mockObject = {};

        const result = objectHasProperty(mockObject, 'test');
        expect(result).toEqual(false);
      });
    });
  });
});
