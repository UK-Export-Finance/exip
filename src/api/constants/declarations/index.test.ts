import DECLARATIONS from '.';
import DECLARATION_VERSIONS from './versions';
import DECLARATION_MODERN_SLAVERY_VERSIONS from './modern-slavery-versions';

describe('api/constants/declarations', () => {
  it('should return an object', () => {
    const expected = {
      VERSIONS: DECLARATION_VERSIONS,
      V1_DECLARATIONS: DECLARATION_VERSIONS[0],
      LATEST_DECLARATIONS: DECLARATION_VERSIONS[DECLARATION_VERSIONS.length - 1],
      MODREN_SLAVERY_VERSIONS: DECLARATION_MODERN_SLAVERY_VERSIONS,
      LATEST_MODERN_SLAVERY_DECLARATIONS: DECLARATION_MODERN_SLAVERY_VERSIONS[DECLARATION_MODERN_SLAVERY_VERSIONS.length - 1],
    };

    expect(DECLARATIONS).toEqual(expected);
  });
});
