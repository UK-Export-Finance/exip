import LATEST_VERSION_NUMBER from '.';

describe('api/constants/application/versions', () => {
  it('should return the latest application version number', () => {
    const expected = 2;

    expect(LATEST_VERSION_NUMBER).toEqual(expected);
  });
});
