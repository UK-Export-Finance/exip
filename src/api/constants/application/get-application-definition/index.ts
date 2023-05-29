import VERSIONS from '../versions';
import { ApplicationVersion } from '../../../types';

/**
 * getApplicationDefinition
 * Get the latest application config
 * @returns {Object} Latest application config
 */
const getApplicationDefinition = (versionNumber: string): ApplicationVersion => {
  const applicationDefinition = VERSIONS.find((VERSION) => VERSION.VERSION_NUMBER === versionNumber);

  if (applicationDefinition) {
    return applicationDefinition;
  }

  console.error('Unable to find latest application version');

  throw new Error('Unable to find latest application version');
};

export default getApplicationDefinition;
