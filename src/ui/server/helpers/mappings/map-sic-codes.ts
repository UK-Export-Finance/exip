import { SicCode, ObjectType } from '../../../types';

/**
 * maps through database response for sicCode andindustrySectorName and returns array of strings
 * @param {Array<SicCode>} codes
 * @param {String} codeOrDescription what to return from sicCode array
 * @returns {Array<string>} array of sic codes in text form
 */
const mapSicCodes = (codes: Array<SicCode>, codeOrDescription: string) => {
  const sicCodes = codes.map((code: ObjectType) => code[codeOrDescription]);

  return sicCodes;
};

export default mapSicCodes;
