import sanitiseValue, { STRING_NUMBER_FIELDS, replaceCharactersWithCharacterCode, shouldChangeToNumber } from '.';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import { mockPhoneNumbers, mockBuyer } from '../../../test-mocks';

const {
  ACCOUNT: { ACCESS_CODE },
  COMPANIES_HOUSE: { COMPANY_NUMBER, COMPANY_SIC },
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { PHONE_NUMBER },
    NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES },
    TURNOVER: { PERCENTAGE_TURNOVER },
  },
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES: { DESCRIPTION },
    AGENT_CHARGES: { FIXED_SUM_AMOUNT },
  },
  POLICY: {
    BROKER_DETAILS: { NAME: BROKER_NAME },
    LOSS_PAYEE_FINANCIAL_UK: { ACCOUNT_NUMBER, SORT_CODE },
  },
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION: { NAME, REGISTRATION_NUMBER, ADDRESS, WEBSITE },
  },
} = INSURANCE_FIELD_IDS;

describe('server/helpers/sanitise-data/sanitise-value', () => {
  const mockFieldKey = 'fieldA';

  describe('STRING_NUMBER_FIELDS', () => {
    it('should return an explicit array of field IDs that are string fields that could have a pure number value', () => {
      const expected = [
        ACCESS_CODE,
        DESCRIPTION,
        COMPANY_NUMBER,
        COMPANY_SIC,
        PHONE_NUMBER,
        GOODS_OR_SERVICES,
        BROKER_NAME,
        NAME,
        REGISTRATION_NUMBER,
        ADDRESS,
        ACCOUNT_NUMBER,
        SORT_CODE,
        PERCENTAGE_TURNOVER,
        FIXED_SUM_AMOUNT,
      ];

      expect(STRING_NUMBER_FIELDS).toEqual(expected);
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
});
