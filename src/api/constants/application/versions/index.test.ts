import VERSIONS from '.';

describe('api/constants/application/versions', () => {
  it('should return an array of application versions', () => {
    const expected = [
      {
        VERSION_NUMBER: '1',
        OVER_500K_SUPPORT: false,
        MAXIMUM_BUYER_CAN_OWE: 500000,
        TOTAL_VALUE_OF_CONTRACT: 500000,
        DEFAULT_FINAL_DESTINATION_KNOWN: true,
      },
    ];

    expect(VERSIONS).toEqual(expected);
  });
});
