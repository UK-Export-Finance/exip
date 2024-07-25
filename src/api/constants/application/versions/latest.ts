import VERSIONS from '.';

/**
 * LATEST_VERSION_NUMBER
 * Latest application version number.
 * During each phase of EXIP that contains major feature/data changes or additions,
 * the application version number should be changed.
 * For example:
 * - Version number 1: MVP - No support for applications over 500k.
 * - Version number 2: "No PDF" - Support for applications over 500k.
 * - Version number 3: File uploads
 * - Version number 4: Address lookup
 * - Version number 5: Payments integration
 * @returns {String} Latest application version number
 */
const LATEST_VERSION_NUMBER = VERSIONS[VERSIONS.length - 1].VERSION_NUMBER;

export default LATEST_VERSION_NUMBER;
