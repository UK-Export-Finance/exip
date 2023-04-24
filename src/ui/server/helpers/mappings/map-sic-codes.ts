import { SicCode } from '../../../types';

/**
 * maps through database response for sicCode andindustrySectorName and returns array of strings
 * @param {Array<SicCode>} codes
 *  @param {String} type what to return from sicCode array
 * @returns {Array<string>} array of sic codes in text form
 */
const mapSicCodes = (codes: Array<SicCode>, type: string) => {
  const sicCodes = codes.map((code) => code[type]);

  return sicCodes;
};

export default mapSicCodes;
