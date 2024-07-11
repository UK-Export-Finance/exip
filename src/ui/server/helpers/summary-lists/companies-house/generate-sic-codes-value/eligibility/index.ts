import { DEFAULT } from '../../../../../content-strings';
import { isPopulatedArray, stringArrayHasValue } from '../../../../array';

/**
 * mapEligibilitySicCodeValues
 * Map company SIC codes in eligibility answers.
 * This is used to render in an eligibility summary list.
 * @param {Array<String>} sicCodes: SIC codes
 * @param {Array<String>} industrySectorNames: Industry sector names
 * @returns {String} Mapped SIC codes or default empty string
 */
const mapEligibilitySicCodeValues = (sicCodes: Array<string>, industrySectorNames?: Array<string>) => {
  if (isPopulatedArray(sicCodes)) {
    const arr = [] as Array<string>;

    sicCodes.forEach((sicCode, index) => {
      if (industrySectorNames && stringArrayHasValue(index, industrySectorNames)) {
        arr.push(`${sicCode} - ${industrySectorNames[index]} </br>`);
      } else {
        arr.push(`${sicCode} </br>`);
      }
    });

    return arr.join('');
  }

  return DEFAULT.EMPTY;
};

export default mapEligibilitySicCodeValues;
