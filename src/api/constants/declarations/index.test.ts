import DECLARATIONS from '.';
import DECLARATION_VERSIONS from './versions';

describe('api/constants/declarations', () => {
  it('should return an object', () => {
    const expected = {
      VERSIONS: DECLARATION_VERSIONS,
      V1_DECLARATIONS: DECLARATION_VERSIONS[0],
      LATEST_DECLARATIONS: DECLARATION_VERSIONS[DECLARATION_VERSIONS.length - 1],
    };

    expect(DECLARATIONS).toEqual(expected);
  });
});
