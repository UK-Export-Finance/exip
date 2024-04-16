import { REGEX } from '../../constants';

/**
 * stripHyphensAndSpacesFromString
 * removes hyphens and spaces from a string
 * @param {String} string
 * @returns {String}
 */
const stripHyphensAndSpacesFromString = (string: string) => string.replaceAll(REGEX.SPACE_AND_HYPHEN, '');

export default stripHyphensAndSpacesFromString;
