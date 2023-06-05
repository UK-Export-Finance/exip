import getTrueProperties from '.';
import { FIELD_VALUES } from '../../constants';

describe('server/helpers/get-true-properties', () => {
  it('should return an object with valid property values', () => {
    const mockObj = {
      a: true,
      b: false,
      d: FIELD_VALUES.YES,
      e: FIELD_VALUES.NO,
    };

    const result = getTrueProperties(mockObj);

    const expected = {
      a: true,
      d: FIELD_VALUES.YES,
      e: FIELD_VALUES.NO,
    };

    expect(result).toEqual(expected);
  });
});
