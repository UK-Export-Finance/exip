import { NUMBER_FIELDS, sanitiseValue, isDayMonthYearField, shouldIncludeAndSanitiseField, sanitiseData, sanitiseFormField } from '.';
import sanitiseObject from './sanitise-object';
import sanitiseArrayOfStrings from './sanitise-array-of-strings';
import { FIELD_IDS } from '../../constants';

const {
  EXPORTER_BUSINESS: {
    NATURE_OF_YOUR_BUSINESS: { YEARS_EXPORTING, EMPLOYEES_INTERNATIONAL, EMPLOYEES_UK },
    TURNOVER: { ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER },
  },
  POLICY: {
    CONTRACT_POLICY: {
      SINGLE: { TOTAL_CONTRACT_VALUE },
      MULTIPLE: { TOTAL_MONTHS_OF_COVER, TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
    },
  },
} = FIELD_IDS.INSURANCE;

describe('server/helpers/sanitise-data', () => {
  describe('NUMBER_FIELDS', () => {
    it('should return an explicit array of field IDs that are number fields that could have a value of 0', () => {
      const expected = [
        TOTAL_CONTRACT_VALUE,
        TOTAL_MONTHS_OF_COVER,
        TOTAL_SALES_TO_BUYER,
        MAXIMUM_BUYER_WILL_OWE,
        YEARS_EXPORTING,
        EMPLOYEES_INTERNATIONAL,
        EMPLOYEES_UK,
        ESTIMATED_ANNUAL_TURNOVER,
        PERCENTAGE_TURNOVER,
      ];

      expect(NUMBER_FIELDS).toEqual(expected);
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

  describe('shouldIncludeAndSanitiseField', () => {
    describe('when the field is a date related field', () => {
      it('should return false', () => {
        const result = shouldIncludeAndSanitiseField('fieldA-day', '10');

        expect(result).toEqual(false);
      });
    });

    describe('when the field has a matching ID in NUMBER_FIELDS and the value is empty', () => {
      it('should return false', () => {
        const result = shouldIncludeAndSanitiseField(NUMBER_FIELDS[0], '');

        expect(result).toEqual(false);
      });
    });

    it('should return true', () => {
      const result = shouldIncludeAndSanitiseField('goodField', 'Mock value');

      expect(result).toEqual(true);
    });
  });

  describe('sanitiseFormField', () => {
    describe('when the field value is an array', () => {
      it('should return the result of sanitiseArrayOfStrings', () => {
        const mockKey = 'a';
        const mockValue = ['123', '456'];

        const result = sanitiseFormField(mockKey, mockValue);

        const expected = sanitiseArrayOfStrings(mockKey, mockValue);

        expect(result).toEqual(expected);
      });
    });

    describe('when the field value is a valid date', () => {
      it('should return the value as is', () => {
        const mockKey = 'a';
        const mockValue = new Date();

        const result = sanitiseFormField(mockKey, mockValue);

        const expected = mockValue;

        expect(result).toEqual(expected);
      });
    });

    describe('when the field value is a string', () => {
      it('should return the result of sanitiseValue', () => {
        const mockKey = 'a';
        const mockValue = 'mock string';

        const result = sanitiseFormField(mockKey, mockValue);

        const expected = sanitiseValue({ key: mockKey, value: mockValue });

        expect(result).toEqual(expected);
      });
    });

    describe('when the field value is an object with values', () => {
      it('should return the result of sanitiseObject', () => {
        const mockKey = 'a';
        const mockValue = { mock: true };

        const result = sanitiseFormField(mockKey, mockValue);

        const expected = sanitiseObject(mockValue);

        expect(result).toEqual(expected);
      });
    });

    describe('when the field value is an object without values', () => {
      it('should return an empty object', () => {
        const mockKey = 'a';
        const mockValue = {};

        const result = sanitiseFormField(mockKey, mockValue);

        expect(result).toEqual({});
      });
    });

    describe('when the field is an boolean', () => {
      it('should return the value as is', () => {
        const mockKey = 'a';
        const mockValue = true;

        const result = sanitiseFormField(mockKey, mockValue);

        const expected = mockValue;

        expect(result).toEqual(expected);
      });
    });
  });

  describe('sanitiseData', () => {
    it('should return data without _csrf, day/month/year or empty number fields', () => {
      const mockFormData = {
        _csrf: '1234',
        a: 'mock',
        b: 'true',
        c: '100',
        d: '',
        [TOTAL_CONTRACT_VALUE]: '',
        'date-day': '01',
        'date-month': '02',
        'date-year': '2022',
      };

      const result = sanitiseData(mockFormData);

      const expected = {
        a: sanitiseFormField('a', mockFormData.a),
        b: sanitiseFormField('b', mockFormData.b),
        c: sanitiseFormField('c', mockFormData.c),
        d: sanitiseFormField('d', mockFormData.d),
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
