import DECLARATION_VERSIONS from '.';

describe('api/constants/declarations/versions', () => {
  it('should return an array of application versions', () => {
    const expected = [
      {
        ANTI_BRIBERY: '1',
        ANTI_BRIBERY_CODE_OF_CONDUCT: '1',
        ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT: '1',
        CONFIDENTIALITY: '1',
        CONFIRMATION_AND_ACKNOWLEDGEMENTS: '1',
        HOW_YOUR_DATA_WILL_BE_USED: '1',
      },
      {
        ANTI_BRIBERY: '2',
        ANTI_BRIBERY_CODE_OF_CONDUCT: '2',
        ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT: '1',
        CONFIDENTIALITY: '1',
        CONFIRMATION_AND_ACKNOWLEDGEMENTS: '1',
      },
    ];

    expect(DECLARATION_VERSIONS).toEqual(expected);
  });
});
