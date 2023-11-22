import { generateSicCodesValue } from '../../companies-house';
import { DEFAULT } from '../../../../content-strings';
import { SicCode } from '../../../../../types';
import { isPopulatedArray } from '../../../array';

/**
 * mapSicCodes
 * maps application sic code response to generate a string of the sic code values
 * @param {Array<ApplicationExporterSicCodes>} applicationSicCodes
 * @returns {String} sicCodes
 */
const mapSicCodes = (applicationSicCodes: Array<SicCode>) => {
  if (isPopulatedArray(applicationSicCodes)) {
    const sicCodes = applicationSicCodes.map((eachSicCode) => String(eachSicCode.sicCode));
    const industrySectorNames = applicationSicCodes.map((eachSicCode) => String(eachSicCode.industrySectorName));

    return generateSicCodesValue(sicCodes, industrySectorNames);
  }

  return DEFAULT.EMPTY;
};

export default mapSicCodes;
