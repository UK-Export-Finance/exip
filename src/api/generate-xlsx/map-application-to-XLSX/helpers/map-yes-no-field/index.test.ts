import mapYesNoField from '.';
import { FIELD_VALUES } from '../../../../constants';
import { DEFAULT } from '../../../../content-strings';

const { YES, NO } = FIELD_VALUES;

describe('api/generate-xlsx/map-application-to-xlsx/helpers/map-yes-no-field', () => {
  describe('when value is true', () => {
    it(`should return "${YES}"`, () => {
      const response = mapYesNoField({ answer: true });

      expect(response).toEqual(YES);
    });
  });

  describe('when value is "false"', () => {
    it(`should return "${NO}"`, () => {
      const response = mapYesNoField({ answer: true });

      expect(response).toEqual(NO);
    });
  });

  describe('when value is undefined and a default value is passed', () => {
    it('should return the default value', () => {
      const mockDefaultValue = 'Mock default value';

      const response = mapYesNoField({ defaultValue: mockDefaultValue });

      expect(response).toEqual(mockDefaultValue);
    });
  });

  describe('when value is "undefined"', () => {
    it(`should return ${DEFAULT.EMPTY}`, () => {
      const response = mapYesNoField({});

      expect(response).toEqual(DEFAULT.EMPTY);
    });
  });
});
