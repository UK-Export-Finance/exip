import { stripCommas } from './string';

describe('server/helpers/string', () => {
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
