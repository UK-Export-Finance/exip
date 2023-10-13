import { isEmptyString, stripCommas, isPopulatedString, stringsAreDefined, stringsAreEqual } from '.';

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

  describe('isPopulatedString', () => {
    describe('when a string is empty', () => {
      it('should return false', () => {
        const result = isPopulatedString('');

        expect(result).toEqual(false);
      });
    });

    describe('when a string is undefined', () => {
      it('should return false', () => {
        // required to test if undefined
        const result = isPopulatedString(undefined);

        expect(result).toEqual(false);
      });
    });

    describe('when a string is not empty', () => {
      it('should return true', () => {
        const result = isPopulatedString('test');

        expect(result).toEqual(true);
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

  describe('stringsAreDefined', () => {
    describe('both strings are defined', () => {
      it('should return true', () => {
        const result = stringsAreDefined('test', 'test');

        expect(result).toEqual(true);
      });
    });

    describe('one string is defined', () => {
      it('should return false', () => {
        const result = stringsAreDefined('test', undefined);

        expect(result).toEqual(false);
      });
    });

    describe('both strings are undefined', () => {
      it('should return false', () => {
        const result = stringsAreDefined(undefined, undefined);

        expect(result).toEqual(false);
      });
    });
  });

  describe('stringsAreEqual', () => {
    describe('both strings are equal', () => {
      it('should return true', () => {
        const result = stringsAreEqual('test', 'test');

        expect(result).toEqual(true);
      });
    });

    describe('one string is different', () => {
      it('should return false', () => {
        const result = stringsAreEqual('test1', 'test');

        expect(result).toEqual(false);
      });
    });
  });
});
