import { stringArrayHasValue } from '../../../../array';

/**
 * mapEligibilitySicCodeValues
 * Map company SIC codes in eligibility answers.
 * This is used to render in an eligibility summary list.
 * @param {Array<String>} sicCodes: SIC codes
 * @param {Array<String>} industrySectorNames: Industry sector names
 * @returns {String} Mapped SIC codes
 */
const mapEligibilitySicCodeValues = (sicCodes: Array<string>, industrySectorNames?: Array<string>) => {
  const arr = [] as Array<string>;

  sicCodes.forEach((sicCode, index) => {
    if (industrySectorNames && stringArrayHasValue(index, industrySectorNames)) {
      arr.push(`${sicCode} - ${industrySectorNames[index]} </br>`);
    } else {
      arr.push(`${sicCode} </br>`);
    }
  });

  return arr.join('');
};

export default mapEligibilitySicCodeValues;
