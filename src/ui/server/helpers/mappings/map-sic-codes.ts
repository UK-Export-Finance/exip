import { SicCodeResponse } from '../../../types';

/**
 * maps through database response for sicCode and returns array of strings
 * @param {Array<SicCodeResponse>} codes
 * @returns {Array<string>} array of sic codes in text form
 */
const mapSicCodes = (codes: Array<SicCodeResponse>) => {
  const sicCodes = codes.map((code) => code.sicCode);

  return sicCodes;
};

export default mapSicCodes;
