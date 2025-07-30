import { REGEX } from '../../constants';

/**
 * stripHyphensAndSpacesFromString
 * removes hyphens and spaces from a string
 * @param {string} string
 * @returns {string}
 */
const stripHyphensAndSpacesFromString = (string: string) => string.replaceAll(REGEX.SPACE_AND_HYPHEN, '');

export default stripHyphensAndSpacesFromString;
