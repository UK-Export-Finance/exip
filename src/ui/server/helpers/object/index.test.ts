import { objectHasValues, objectHasProperty } from '.';

describe('server/helpers/object', () => {
  describe('objectHasValues', () => {
    describe('when an object has values', () => {
      it('should return true', () => {
        const result = objectHasValues({ a: true });

        expect(result).toEqual(true);
      });
    });

    describe('when an object is empty', () => {
      it('should return false', () => {
        const result = objectHasValues({});

        expect(result).toEqual(false);
      });
    });

    describe('when there is no object', () => {
      it('should return false', () => {
        const result = objectHasValues({});

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
