import sanitiseArrayOfStrings from '.';
import { sanitiseValue } from '../sanitise-value';

describe('server/helpers/sanitise-data/sanitise-array', () => {
  it('should return an array of sanitised strings', () => {
    const mockKey = 'mockKey';
    const mockArray = ['mockValueA', 'mockValueB'];

    const result = sanitiseArrayOfStrings(mockKey, mockArray);

    const expectedItem1 = sanitiseValue({ key: mockKey, value: mockArray[0] });
    const expectedItem2 = sanitiseValue({ key: mockKey, value: mockArray[1] });

    const expected = [expectedItem1, expectedItem2];

    expect(result).toEqual(expected);
  });
});
