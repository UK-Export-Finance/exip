import VERSIONS from './versions';
import getLatestDeclarationVersion from './get-latest-declarations';

const LATEST_DECLARATIONS = getLatestDeclarationVersion();

/**
 * DECLARATIONS
 * DECLARATION constants - declarations need to be versioned so we have a record of which version a user accepted.
 * These constants are used to populate the declarations and to keep a record of the version submitted.
 * @returns {Object} Declaration constants
 */
export const DECLARATIONS = {
  VERSIONS,
  LATEST_DECLARATIONS,
};
