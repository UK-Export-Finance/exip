import sortArrayAlphabetically from '.';

describe('helpers/sort-array-alphabetically', () => {
  it('should sort an array of objects alphabetically', () => {
    const mockArray = [{ name: 'c' }, { name: 'z' }, { name: 'b' }, { name: 'a' }];

    const result = sortArrayAlphabetically(mockArray, 'name');

    const expected = [{ name: 'a' }, { name: 'b' }, { name: 'c' }, { name: 'z' }];

    expect(result).toEqual(expected);
  });
});
