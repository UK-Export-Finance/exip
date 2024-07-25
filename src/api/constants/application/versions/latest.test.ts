import LATEST_VERSION_NUMBER from './latest';
import VERSIONS from '.';

describe('api/constants/application/versions', () => {
  it('should return the latest application version number', () => {
    const expected = VERSIONS[VERSIONS.length - 1].VERSION_NUMBER;

    expect(LATEST_VERSION_NUMBER).toEqual(expected);
  });
});
