import sanitiseObject from '.';
import { sanitiseValue } from '../sanitise-value';
import sanitiseArrayOfStrings from '../sanitise-array-of-strings';

describe('server/helpers/sanitise-data/sanitise-object', () => {
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

  describe('when an object contains a null value', () => {
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
    it('should return the result of sanitiseArrayOfStrings for each relevant property in object', () => {
      const [mockKey1, mockKey2] = ['a', 'b'];
      const [mockValue1, mockValue2] = ['mock', ['mockArrayItem']];

      const mockObject = {
        [mockKey1]: mockValue1,
        [mockKey2]: mockValue2,
      };

      const result = sanitiseObject(mockObject);

      const expected = {
        a: sanitiseValue({ key: mockKey1, value: mockValue1 }),
        b: sanitiseArrayOfStrings(mockKey2, mockValue2),
      };

      expect(result).toEqual(expected);
    });
  });
});
