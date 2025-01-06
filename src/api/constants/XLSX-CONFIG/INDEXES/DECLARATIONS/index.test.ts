import DECLARATIONS_INDEXES from '.';

describe('api/constants/XLSX-CONFIG/INDEXES/DECLARATIONS', () => {
  it('should return an object with indexes', () => {
    const expected = {
      CANNOT_ADHERE_TO_ALL_REQUIREMENTS: 7,
      OFFENSES_OR_INVESTIGATIONS: 9,
      AWARE_OF_EXISTING_SLAVERY: 11,
    };

    expect(DECLARATIONS_INDEXES()).toEqual(expected);
  });
});
