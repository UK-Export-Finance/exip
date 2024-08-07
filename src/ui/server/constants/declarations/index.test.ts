import DECLARATIONS from '.';
import VERSIONS from './versions';
import getLatestDeclarationVersion from './get-latest-declarations';

describe('server/constants/declarations/', () => {
  it('should return an object', () => {
    const expected = {
      VERSIONS,
      LATEST_DECLARATIONS: getLatestDeclarationVersion(),
    };

    expect(DECLARATIONS).toEqual(expected);
  });
});
