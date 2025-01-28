import DECLARATION_MODERN_SLAVERY_VERSIONS from '.';

describe('api/constants/declarations/modern-slavery-versions', () => {
  it('should return an array of modern slavery decalration versions', () => {
    const expected = [
      {
        WILL_ADHERE_TO_ALL_REQUIREMENTS: '1',
        HAS_NO_OFFENSES_OR_INVESTIGATIONS: '1',
        IS_NOT_AWARE_OF_EXISTING_SLAVERY: '1',
      },
    ];

    expect(DECLARATION_MODERN_SLAVERY_VERSIONS).toEqual(expected);
  });
});
