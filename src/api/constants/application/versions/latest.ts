import VERSIONS from '.';

/**
 * LATEST_VERSION_NUMBER
 * Latest application version number.
 * During each phase of EXIP that contains major feature/data changes or additions,
 * the application version number should be changed.
 * For example:
 * - Version number 1: MVP - No support for applications over 500k.
 * - Version number 2: "No PDF" - Support for applications over 500k.
 * - Version number 3: "No PDF" design and content iterations. 1x new database field.
 * - Version number 4: New declaration - "Modern slavery".
 * - Version number 5: Broker address lookup (Ordnance Survey integration)
 * - Version number 6: Payments integration
 * @returns {string} Latest application version number
 */
const LATEST_VERSION_NUMBER = VERSIONS[VERSIONS.length - 1].VERSION_NUMBER;

export default LATEST_VERSION_NUMBER;
