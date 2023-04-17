import getTrueProperties from '.';
import { FIELD_VALUES } from '../../constants';

describe('server/helpers/get-true-properties', () => {
  it(`should return an object with true and ${FIELD_VALUES.YES} property values`, () => {
    const mockObj = {
      a: true,
      b: false,
      c: FIELD_VALUES.YES,
    };

    const result = getTrueProperties(mockObj);

    const expected = {
      a: true,
      c: FIELD_VALUES.YES,
    };

    expect(result).toEqual(expected);
  });
});
