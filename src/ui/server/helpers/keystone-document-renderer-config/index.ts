import { objectHasKeysAndValues } from '../object';

/**
 * keystoneDocumentRendererConfig
 * Generate config/settings for keystone document renderer component
 * @param {Object} Custom settings
 * @returns {Object} Keystone document renderer config
 */
const keystoneDocumentRendererConfig = (overrides?: object) => {
  let config = {
    listItemClass: 'counter-list-item',
    secondLevelListClass: 'lower-alpha-counter-list',
    thirdLevelListClass: 'lower-roman-counter-list',
  };

  if (overrides && objectHasKeysAndValues(overrides)) {
    config = {
      ...config,
      ...overrides,
    };
  }

  return config;
};

export default keystoneDocumentRendererConfig;
