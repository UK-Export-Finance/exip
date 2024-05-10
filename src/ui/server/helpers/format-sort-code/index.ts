import { MAXIMUM_CHARACTERS } from '../../constants';
import { DEFAULT } from '../../content-strings';

const { EMPTY } = DEFAULT;

/**
 * formatSortCode
 * Format a sort code.
 * Transforms a sort code string of e.g 123456 into 12-34-56.
 * @param {String} sortCode: Sort code
 * @returns {String} Formatted sort code
 */
const formatSortCode = (sortCode: string) => {
  if (sortCode.length === MAXIMUM_CHARACTERS.SORT_CODE) {
    const str0 = sortCode.substring(0, 2);
    const str1 = sortCode.substring(2, 4);
    const str2 = sortCode.substring(4, 6);

    const formatted = `${str0}${EMPTY}${str1}${EMPTY}${str2}`;

    return formatted;
  }

  return EMPTY;
};

export default formatSortCode;
