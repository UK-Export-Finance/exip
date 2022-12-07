import { shouldChangeToNumber, sanitiseValue, sanitiseData } from './sanitise-data';

describe('server/helpers/sanitise-data', () => {
  describe('shouldChangeToNumber', () => {
    describe('when the value is a string number', () => {
      it('should return true', () => {
        const result = shouldChangeToNumber('123');

        expect(result).toEqual(true);
      });
    });

    describe('when the value is a string number of 0', () => {
      it('should return true', () => {
        const result = shouldChangeToNumber('0');

        expect(result).toEqual(true);
      });
    });

    describe('when the value is a string number with commas and translates to a number', () => {
      it('should return true', () => {
        const result = shouldChangeToNumber('123,456');

        expect(result).toEqual(true);
      });
    });

    describe('when the value is a string number with commas that does NOT translate to a number', () => {
      it('should return true', () => {
        const result = shouldChangeToNumber('£123,456');

        expect(result).toEqual(false);
      });
    });

    it('should return false', () => {
      const result = shouldChangeToNumber('mock');

      expect(result).toEqual(false);
    });
  });

  describe('sanitiseValue', () => {
    describe('when value is a string of true', () => {
      it('should return boolean', () => {
        const result = sanitiseValue('true');

        expect(result).toEqual(true);
      });
    });

    describe('when value is a string of false', () => {
      it('should return boolean', () => {
        const result = sanitiseValue('false');

        expect(result).toEqual(false);
      });
    });

    describe('when value is a true boolean', () => {
      it('should return boolean', () => {
        const result = sanitiseValue(true);

        expect(result).toEqual(true);
      });
    });

    describe('when value is a false boolean', () => {
      it('should return boolean', () => {
        const result = sanitiseValue(false);

        expect(result).toEqual(false);
      });
    });

    describe('when value is a string number', () => {
      it('should return a number', () => {
        const result = sanitiseValue('123');

        expect(result).toEqual(123);
      });
    });

    describe('when value is a string number with commas', () => {
      it('should return a number with commas removed', () => {
        const result = sanitiseValue('1,234,567');

        expect(result).toEqual(1234567);
      });
    });

    describe('when value is a plain string', () => {
      it('should return value', () => {
        const result = sanitiseValue('mock');

        expect(result).toEqual('mock');
      });
    });
  });

  describe('sanitiseData', () => {
    it('should remove _csrf and return sanitised data', () => {
      const mockFormData = {
        _csrf: '1234',
        a: 'mock',
        b: 'true',
        c: '100',
      };

      const result = sanitiseData(mockFormData);

      const expected = {
        a: mockFormData.a,
        b: true,
        c: 100,
      };

      expect(result).toEqual(expected);
    });

    describe('when formBody._csrf does not exist', () => {
      it('should return an empty object', () => {
        const result = sanitiseData({});

        expect(result).toEqual({});
      });
    });
  });
});
