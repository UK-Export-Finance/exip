const {
  shouldChangeStringToNumber,
  sanitiseValue,
  sanitiseFormData,
} = require('./sanitise-form-data');

describe('server/helpers/sanitise-form-data', () => {
  describe('shouldChangeStringToNumber', () => {
    describe('when the value is a string number', () => {
      it('should return true', () => {
        const result = shouldChangeStringToNumber('123');

        expect(result).toEqual(true);
      });
    });

    describe('when the value is a string number of 0', () => {
      it('should return true', () => {
        const result = shouldChangeStringToNumber('0');

        expect(result).toEqual(true);
      });
    });

    it('should return false', () => {
      const result = shouldChangeStringToNumber('mock');

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

    describe('when value is a string number', () => {
      it('should return a number', () => {
        const result = sanitiseValue('123');

        expect(result).toEqual(123);
      });
    });

    describe('when value is a plain string', () => {
      it('should return value', () => {
        const result = sanitiseValue('mock');

        expect(result).toEqual('mock');
      });
    });
  });

  describe('sanitiseFormData', () => {
    const mockFormData = {
      a: 'mock',
      b: 'true',
      c: '100',
    };

    const result = sanitiseFormData(mockFormData);

    const expected = {
      a: mockFormData.a,
      b: true,
      c: 100,
    };

    expect(result).toEqual(expected);
  });
});
