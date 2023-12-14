import replaceNewLineWithLineBreak from '../../replace-new-line-with-line-break';
import { DEFAULT } from '../../../content-strings';

/**
 * generateAddressObject
 * generates object with address to generate html string for address section
 * @param {String} rawAddress
 * @returns {Object}
 */
const generateAddressObject = (rawAddress?: string) => (rawAddress ? { address: replaceNewLineWithLineBreak(rawAddress) } : { address: DEFAULT.EMPTY });
export default generateAddressObject;
