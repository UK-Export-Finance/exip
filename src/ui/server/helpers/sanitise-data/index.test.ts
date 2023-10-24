import {
  NUMBER_FIELDS,
  STRING_NUMBER_FIELDS,
  shouldChangeToNumber,
  replaceCharactersWithCharacterCode,
  sanitiseArray,
  sanitiseObject,
  sanitiseValue,
  isDayMonthYearField,
  shouldIncludeAndSanitiseField,
  sanitiseData,
  sanitiseFormField,
} from '.';
import { FIELD_IDS } from '../../constants';
import { mockPhoneNumbers, mockBuyer } from '../../test-mocks';

const {
  ACCOUNT: { SECURITY_CODE },
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: { COMPANY_NUMBER, COMPANY_SIC },
    YOUR_COMPANY: { PHONE_NUMBER },
    NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_INTERNATIONAL, EMPLOYEES_UK },
    TURNOVER: { ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER },
    BROKER: { ADDRESS_LINE_1, ADDRESS_LINE_2, POSTCODE, NAME: BROKER_NAME },
  },
  POLICY: {
    CONTRACT_POLICY: {
      CREDIT_PERIOD_WITH_BUYER,
      SINGLE: { TOTAL_CONTRACT_VALUE },
      MULTIPLE: { TOTAL_MONTHS_OF_COVER, TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
    },
    ABOUT_GOODS_OR_SERVICES: { DESCRIPTION },
  },
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION: { NAME, REGISTRATION_NUMBER, ADDRESS, FIRST_NAME, LAST_NAME, POSITION, WEBSITE },
  },
} = FIELD_IDS.INSURANCE;

describe('server/helpers/sanitise-data', () => {
  const mockFieldKey = 'fieldA';

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

  describe('STRING_NUMBER_FIELDS', () => {
    it('should return an explicit array of field IDs that are string fields that could have a pure number value', () => {
      const expected = [
        SECURITY_CODE,
        CREDIT_PERIOD_WITH_BUYER,
        DESCRIPTION,
        COMPANY_NUMBER,
        COMPANY_SIC,
        PHONE_NUMBER,
        GOODS_OR_SERVICES,
        ADDRESS_LINE_1,
        ADDRESS_LINE_2,
        POSTCODE,
        BROKER_NAME,
        NAME,
        REGISTRATION_NUMBER,
        ADDRESS,
        FIRST_NAME,
        LAST_NAME,
        POSITION,
      ];

      expect(STRING_NUMBER_FIELDS).toEqual(expected);
    });
  });

  describe('shouldChangeToNumber', () => {
    describe('when the value is a string number', () => {
      it('should return true', () => {
        const result = shouldChangeToNumber({ key: mockFieldKey, value: '123' });

        expect(result).toEqual(true);
      });
    });

    describe('when the value is a string number of 0', () => {
      it('should return true', () => {
        const result = shouldChangeToNumber({ key: mockFieldKey, value: '0' });

        expect(result).toEqual(true);
      });
    });

    describe('when the value is a string number with commas and translates to a number', () => {
      it('should return true', () => {
        const result = shouldChangeToNumber({ key: mockFieldKey, value: '123,456' });

        expect(result).toEqual(true);
      });
    });

    describe('when the value is a string number with commas that does NOT translate to a number', () => {
      it('should return true', () => {
        const result = shouldChangeToNumber({ key: mockFieldKey, value: '£123,456' });

        expect(result).toEqual(false);
      });
    });

    it('should return false', () => {
      const result = shouldChangeToNumber({ key: mockFieldKey, value: 'mock' });

      expect(result).toEqual(false);
    });
  });

  describe('replaceCharactersWithCharacterCode', () => {
    it('should replace ampersand characters', () => {
      const result = replaceCharactersWithCharacterCode('&test&');

      const expected = '&amp;test&amp;';

      expect(result).toEqual(expected);
    });

    it('should replace `lower than` characters', () => {
      const result = replaceCharactersWithCharacterCode('<test<');

      const expected = '&lt;test&lt;';

      expect(result).toEqual(expected);
    });

    it('should replace `greater than` characters', () => {
      const result = replaceCharactersWithCharacterCode('>test>');

      const expected = '&gt;test&gt;';

      expect(result).toEqual(expected);
    });

    it('should replace quote characters', () => {
      const result = replaceCharactersWithCharacterCode('"test"');

      const expected = '&quot;test&quot;';

      expect(result).toEqual(expected);
    });

    it('should replace apostrophe characters', () => {
      const result = replaceCharactersWithCharacterCode("'test'");

      const expected = '&#x27;test&#x27;';

      expect(result).toEqual(expected);
    });

    it('should replace forward slash characters', () => {
      const result = replaceCharactersWithCharacterCode('/test/');

      const expected = '&#x2F;test&#x2F;';

      expect(result).toEqual(expected);
    });

    it('should replace star characters', () => {
      const result = replaceCharactersWithCharacterCode('**');

      const expected = '&#42;&#42;';

      expect(result).toEqual(expected);
    });
  });

  describe('sanitiseArray', () => {
    describe('when the array is an array of objects', () => {
      it('should return the result of sanitiseObject for each value in the array', () => {
        const mockKey = 'a';
        const mockArray = [{ mock: 'a' }, { mock: 'b' }];

        const result = sanitiseArray(mockKey, mockArray);

        const expected = [sanitiseObject(mockArray[0]), sanitiseObject(mockArray[1])];

        expect(result).toEqual(expected);
      });
    });

    describe('when the array is an array of strings', () => {
      it('should return the result of sanitiseValue for each value in the array', () => {
        const mockKey = 'a';
        const mockArray = ['mockValueA', 'mockValueB'];

        const result = sanitiseArray(mockKey, mockArray);

        const expectedObj1 = sanitiseValue({ key: mockKey, value: mockArray[0] });
        const expectedObj2 = sanitiseValue({ key: mockKey, value: mockArray[1] });

        const expected = [expectedObj1, expectedObj2];

        expect(result).toEqual(expected);
      });
    });
  });

  describe('sanitiseObject', () => {
    it('should return the result of sanitiseValue for each property in the object', () => {
      const mockObject = {
        a: 'mock',
        b: 'test',
      };

      const result = sanitiseObject(mockObject);

      const expected = {
        a: sanitiseValue({ key: 'a', value: mockObject.a }),
        b: sanitiseValue({ key: 'b', value: mockObject.b }),
      };

      expect(result).toEqual(expected);
    });

    describe('when an object contains a  null value', () => {
      it('should NOT return the null value', () => {
        const mockObject = {
          a: 'mock',
          b: null,
        };

        const result = sanitiseObject(mockObject);

        const expected = {
          a: sanitiseValue({ key: 'a', value: mockObject.a }),
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when an object contains a nested object', () => {
      it('should return the result of sanitiseValue for each property in every object', () => {
        const mockObject = {
          a: 'mock',
          b: { c: 'nested' },
        };

        const result = sanitiseObject(mockObject);

        const expected = {
          a: sanitiseValue({ key: 'a', value: mockObject.a }),
          b: sanitiseObject(mockObject.b),
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when an object contains a nested array', () => {
      it('should return the array with sanitiseArray', () => {
        const mockObject = {
          a: 'mock',
          b: [{ mock: true }],
        };

        const result = sanitiseObject(mockObject);

        const expected = {
          a: sanitiseValue({ key: 'a', value: mockObject.a }),
          b: sanitiseArray('b', mockObject.b),
        };

        expect(result).toEqual(expected);
      });
    });
  });

  describe('sanitiseValue', () => {
    describe('when the value is a string of true', () => {
      it('should return boolean', () => {
        const result = sanitiseValue({ value: 'true' });

        expect(result).toEqual(true);
      });
    });

    describe('when the value is a string of false', () => {
      it('should return boolean', () => {
        const result = sanitiseValue({ value: 'false' });

        expect(result).toEqual(false);
      });
    });

    describe('when the value is a true boolean', () => {
      it('should return boolean', () => {
        const result = sanitiseValue({ value: true });

        expect(result).toEqual(true);
      });
    });

    describe('when the value is a false boolean', () => {
      it('should return boolean', () => {
        const result = sanitiseValue({ value: false });

        expect(result).toEqual(false);
      });
    });

    describe('when the value is a string number', () => {
      it('should return a number', () => {
        const result = sanitiseValue({ value: '123' });

        expect(result).toEqual(123);
      });
    });

    describe('when the value is a string number with commas', () => {
      it('should return a number with commas removed', () => {
        const result = sanitiseValue({ value: '1,234,567' });

        expect(result).toEqual(1234567);
      });
    });

    describe('when the value is a string', () => {
      it('should return value with replaceCharactersWithCharacterCode', () => {
        const mockStr = '\'mock\'&><"test"/';

        const result = sanitiseValue({ value: mockStr });

        const expected = replaceCharactersWithCharacterCode(mockStr);

        expect(result).toEqual(expected);
      });
    });

    describe(`when the key is ${COMPANY_NUMBER} with a string number value`, () => {
      it('should return the value as a string', () => {
        const result = sanitiseValue({ key: COMPANY_NUMBER, value: '12345' });

        expect(result).toEqual('12345');
      });
    });

    describe(`when the key is ${PHONE_NUMBER}`, () => {
      it('should return value', () => {
        const phoneNumber = mockPhoneNumbers.VALID_PHONE_NUMBERS.LANDLINE;

        const result = sanitiseValue({ key: COMPANY_NUMBER, value: phoneNumber });

        expect(result).toEqual(phoneNumber);
      });
    });

    describe(`when the key is ${WEBSITE}`, () => {
      it('should return value without sanitisation', () => {
        const website = mockBuyer[WEBSITE];

        const result = sanitiseValue({ key: WEBSITE, value: website });

        expect(result).toEqual(website);
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
      it('should return the result of sanitiseArray', () => {
        const mockKey = 'a';
        const mockValue = ['123', '456'];

        const result = sanitiseFormField(mockKey, mockValue);

        const expected = sanitiseArray(mockKey, mockValue);

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
