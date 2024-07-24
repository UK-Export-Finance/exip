import LATEST_DECLARATION_VERSION_NUMBERS from './latest';
import DECLARATION_VERSIONS from '.';

describe('api/constants/declarations/versions/latest', () => {
  it('should return the latest declaration version numbers', () => {
    const expected = DECLARATION_VERSIONS[DECLARATION_VERSIONS.length - 1];

    expect(LATEST_DECLARATION_VERSION_NUMBERS).toEqual(expected);
  });
});
