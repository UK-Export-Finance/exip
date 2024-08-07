import DECLARATION_VERSIONS from './versions';

/**
 * DECLARATIONS
 * DECLARATION constants - declarations need to be versioned so we have a record of which version a user accepted.
 * These constants are used to populate the declarations and to keep a record of the version submitted.
 * @returns {Object} Declaration constants
 */
export const DECLARATIONS = {
  VERSIONS: DECLARATION_VERSIONS,
  V1_DECLARATIONS: DECLARATION_VERSIONS[0],
  LATEST_DECLARATIONS: DECLARATION_VERSIONS[DECLARATION_VERSIONS.length - 1],
};

export default DECLARATIONS;
