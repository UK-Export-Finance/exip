import keystoneDocumentRendererConfig from '.';

describe('server/helpers/keystone-document-renderer-config', () => {
  const defaultConfig = {
    listItemClass: 'counter-list-item',
    secondLevelListClass: 'lower-alpha-counter-list',
    thirdLevelListClass: 'lower-roman-counter-list',
  };

  it('should return an object with default config', () => {
    const result = keystoneDocumentRendererConfig();

    expect(result).toEqual(defaultConfig);
  });

  describe('when overrides are provided', () => {
    it('should return default config with additional settings', () => {
      const overrides = {
        thirdLevelListClass: 'mock-class',
      };

      const result = keystoneDocumentRendererConfig(overrides);

      const expected = {
        ...defaultConfig,
        ...overrides,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when overrides is an empty object', () => {
    it('should return default config', () => {
      const overrides = {};

      const result = keystoneDocumentRendererConfig(overrides);

      expect(result).toEqual(defaultConfig);
    });
  });
});
