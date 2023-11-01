import sanitiseArrayOfStrings from '.';
import { sanitiseValue } from '../sanitise-value';

describe('server/helpers/sanitise-data/sanitise-array', () => {
  it('should return an array of sanitised strings', () => {
    const mockArray = ['mockValueA', 'mockValueB'];

    const result = sanitiseArrayOfStrings(mockArray);

    const expectedItem1 = sanitiseValue({ key: mockArray[0], value: mockArray[0] });
    const expectedItem2 = sanitiseValue({ key: mockArray[1], value: mockArray[1] });

    const expected = [expectedItem1, expectedItem2];

    expect(result).toEqual(expected);
  });
});
