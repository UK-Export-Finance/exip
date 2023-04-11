import {
  NUMBER_FIELDS,
  STRING_NUMBER_FIELDS,
  shouldChangeToNumber,
  replaceCharactersWithCharacterCode,
  sanitiseValue,
  isDayMonthYearField,
  shouldIncludeAndSanitiseField,
  sanitiseData,
} from '.';
import { FIELD_IDS } from '../../constants';
import { mockPhoneNumbers } from '../../test-mocks';

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: { COMPANY_NUMBER },
    YOUR_COMPANY: { PHONE_NUMBER },
    NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_INTERNATIONAL, EMPLOYEES_UK },
    TURNOVER: { ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER },
    BROKER: { ADDRESS_LINE_1, ADDRESS_LINE_2, POSTCODE, NAME: BROKER_NAME },
  },
  POLICY_AND_EXPORTS: {
    CONTRACT_POLICY: {
      CREDIT_PERIOD_WITH_BUYER,
      SINGLE: { TOTAL_CONTRACT_VALUE },
      MULTIPLE: { TOTAL_MONTHS_OF_COVER, TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
    },
    ABOUT_GOODS_OR_SERVICES: { DESCRIPTION },
  },
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION: { NAME, REGISTRATION_NUMBER, ADDRESS, FIRST_NAME, LAST_NAME, POSITION },
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
        CREDIT_PERIOD_WITH_BUYER,
        DESCRIPTION,
        COMPANY_NUMBER,
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
        const result = shouldChangeToNumber(mockFieldKey, '123');

        expect(result).toEqual(true);
      });
    });

    describe('when the value is a string number of 0', () => {
      it('should return true', () => {
        const result = shouldChangeToNumber(mockFieldKey, '0');

        expect(result).toEqual(true);
      });
    });

    describe('when the value is a string number with commas and translates to a number', () => {
      it('should return true', () => {
        const result = shouldChangeToNumber(mockFieldKey, '123,456');

        expect(result).toEqual(true);
      });
    });

    describe('when the value is a string number with commas that does NOT translate to a number', () => {
      it('should return true', () => {
        const result = shouldChangeToNumber(mockFieldKey, '£123,456');

        expect(result).toEqual(false);
      });
    });

    it('should return false', () => {
      const result = shouldChangeToNumber(mockFieldKey, 'mock');

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

  describe('sanitiseValue', () => {
    describe('when value is a string of true', () => {
      it('should return boolean', () => {
        const result = sanitiseValue(mockFieldKey, 'true');

        expect(result).toEqual(true);
      });
    });

    describe('when value is a string of false', () => {
      it('should return boolean', () => {
        const result = sanitiseValue(mockFieldKey, 'false');

        expect(result).toEqual(false);
      });
    });

    describe('when value is a true boolean', () => {
      it('should return boolean', () => {
        const result = sanitiseValue(mockFieldKey, true);

        expect(result).toEqual(true);
      });
    });

    describe('when value is a false boolean', () => {
      it('should return boolean', () => {
        const result = sanitiseValue(mockFieldKey, false);

        expect(result).toEqual(false);
      });
    });

    describe('when value is a string number', () => {
      it('should return a number', () => {
        const result = sanitiseValue(mockFieldKey, '123');

        expect(result).toEqual(123);
      });
    });

    describe('when value is a string number with commas', () => {
      it('should return a number with commas removed', () => {
        const result = sanitiseValue(mockFieldKey, '1,234,567');

        expect(result).toEqual(1234567);
      });
    });

    describe('when value is a string', () => {
      it('should return value with replaceCharactersWithCharacterCode', () => {
        const mockStr = '\'mock\'&><"test"/';

        const result = sanitiseValue(mockFieldKey, mockStr);

        const expected = replaceCharactersWithCharacterCode(mockStr);

        expect(result).toEqual(expected);
      });
    });

    describe(`when value is ${COMPANY_NUMBER}`, () => {
      it('should return value', () => {
        const result = sanitiseValue(COMPANY_NUMBER, '12345');

        expect(result).toEqual('12345');
      });
    });

    describe(`when value is ${PHONE_NUMBER}`, () => {
      it('should return value', () => {
        const phoneNumber = mockPhoneNumbers.VALID_PHONE_NUMBERS.LANDLINE;

        const result = sanitiseValue(COMPANY_NUMBER, phoneNumber);

        expect(result).toEqual(phoneNumber);
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
        a: mockFormData.a,
        b: true,
        c: 100,
        d: '',
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
