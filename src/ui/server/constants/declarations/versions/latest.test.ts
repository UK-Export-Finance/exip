import LATEST_VERSION_NUMBER from '.';

describe('server/constants/declarations/versions/latest', () => {
  it('should return the latest version number', () => {
    expect(LATEST_VERSION_NUMBER).toEqual('2');
  });
});
