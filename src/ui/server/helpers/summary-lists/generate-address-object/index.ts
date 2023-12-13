import replaceNewLineWithLineBreak from '../../replace-new-line-with-line-break';
import { DEFAULT } from '../../../content-strings';

/**
 * generateAddressObject
 * generates object with address to generate html string for address section
 * @param {String} rawAddress
 * @returns {Object}
 */
const generateAddressObject = (rawAddress?: string) => {
  let address = DEFAULT.EMPTY;

  if (rawAddress) {
    // replace new lines with line breaks to display in summary list
    address = replaceNewLineWithLineBreak(rawAddress);
  }

  return {
    address,
  };
};

export default generateAddressObject;
