import mapSelectOption from './map-select-option';
import nameAndIsoCodeText from '../name-and-iso-code-text';
import { mockCurrencies } from '../../test-mocks';

describe('server/helpers/mappings/map-select-option', () => {
  const [mockOption] = mockCurrencies;

  it('should return an object with text and value properties', () => {
    const result = mapSelectOption(mockOption.name, mockOption.isoCode, false);

    const expected = {
      text: mockOption.name,
      value: mockOption.isoCode,
      selected: false,
    };

    expect(result).toEqual(expected);
  });

  describe('when renderValueInText is true', () => {
    it('should return text with value', () => {
      const result = mapSelectOption(mockOption.name, mockOption.isoCode, true);

      const expected = {
        text: nameAndIsoCodeText(mockOption.name, mockOption.isoCode),
        value: mockOption.isoCode,
        selected: false,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when selectedValue is passed', () => {
    it('should return selected property with value of true', () => {
      const mockSelectedValue = mockOption.isoCode;

      const result = mapSelectOption(mockOption.name, mockOption.isoCode, true, mockSelectedValue);

      expect(result.selected).toEqual(true);
    });
  });
});
