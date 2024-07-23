import LATEST_VERSION_NUMBER from './versions/latest';
import VERSIONS from './versions';
import getLatestDeclarationVersion from './get-latest-declarations';

const LATEST_DECLARATIONS = getLatestDeclarationVersion(LATEST_VERSION_NUMBER);

export const DECLARATIONS = {
  LATEST_VERSION_NUMBER,
  VERSIONS,
  LATEST_DECLARATIONS,
};
