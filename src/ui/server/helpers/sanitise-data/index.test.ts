import { shouldChangeToNumber, sanitiseValue, isDayMonthYearField, sanitiseData } from '.';

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

  describe('isDayMonthYearField', () => {
    describe('when a field name contains `-day`', () => {
      it('should return true', () => {
        const result = isDayMonthYearField('-day');

        expect(result).toEqual(true);
      });
    });

    describe('when a field name contains `-month`', () => {
      it('should return true', () => {
        const result = isDayMonthYearField('-month');

        expect(result).toEqual(true);
      });
    });

    describe('when a field name contains `-year`', () => {
      it('should return true', () => {
        const result = isDayMonthYearField('-year');

        expect(result).toEqual(true);
      });
    });

    describe('when a field name does not contain day/month/year', () => {
      it('should return false', () => {
        const result = isDayMonthYearField('mockField');

        expect(result).toEqual(false);
      });
    });
  });

  describe('sanitiseData', () => {
    it('should return data without _csrf, empty fields and day/month/year fields', () => {
      const mockFormData = {
        _csrf: '1234',
        a: 'mock',
        b: 'true',
        c: '100',
        d: '',
        'date-day': '01',
        'date-month': '02',
        'date-year': '2022',
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
      it('should return return sanitised data', () => {
        const mockFormData = {
          a: 'true',
        };

        const result = sanitiseData(mockFormData);

        const expected = {
          a: true,
        };

        expect(result).toEqual(expected);
      });
    });
  });
});
