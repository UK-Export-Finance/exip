import { generateSicCodesValue } from '../../company-house-summary-list';
import { DEFAULT } from '../../../../content-strings';
import { ApplicationExporterSicCodes } from '../../../../../types';
import { isPopulatedArray } from '../../../array';

/**
 * mapSicCodes
 * maps application sic code response to generate a string of the sic code values
 * @param {Array<ApplicationExporterSicCodes>} applicationSicCodes
 * @returns {String} sicCodes
 */
const mapSicCodes = (applicationSicCodes: Array<ApplicationExporterSicCodes>) => {
  if (isPopulatedArray(applicationSicCodes)) {
    const sicCodes = applicationSicCodes.map((eachSicCode) => String(eachSicCode.sicCode));
    const industrySectorNames = applicationSicCodes.map((eachSicCode) => String(eachSicCode.industrySectorName));

    return generateSicCodesValue(sicCodes, industrySectorNames);
  }

  return DEFAULT.EMPTY;
};

export default mapSicCodes;
