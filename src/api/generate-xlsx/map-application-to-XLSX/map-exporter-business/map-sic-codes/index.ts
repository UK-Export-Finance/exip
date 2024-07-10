import NEW_LINE from '../../helpers/xlsx-new-line';
import { ApplicationCompanySicCode } from '../../../../types';

/**
 * mapSicCodes
 * Map an application's array of company SIC codes into a single string
 * @param {Array} Application company SIC codes
 * @returns {String} String of company SIC codes for XLSX generation
 */
const mapSicCodes = (sicCodes: Array<ApplicationCompanySicCode>) => {
  let mapped = '';

  sicCodes.forEach((sicCodeObj) => {
    const { sicCode, industrySectorName } = sicCodeObj;

    mapped += `${sicCode} - ${industrySectorName}${NEW_LINE}`;
  });

  return mapped;
};

export default mapSicCodes;
