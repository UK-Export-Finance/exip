import { isEmptyString, stripCommas } from '.';

describe('server/helpers/string', () => {
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

  describe('stripCommas', () => {
    describe('when a string has a comma', () => {
      it('should return a string without commas', () => {
        const result = stripCommas('123,456');

        expect(result).toEqual('123456');
      });
    });

    describe('when a string has multiple commas', () => {
      it('should return a string without commas', () => {
        const result = stripCommas('1,234,567');

        expect(result).toEqual('1234567');
      });
    });

    describe('when a string does not have a comma', () => {
      it('should return string', () => {
        const result = stripCommas('123456');

        expect(result).toEqual('123456');
      });
    });
  });
});
