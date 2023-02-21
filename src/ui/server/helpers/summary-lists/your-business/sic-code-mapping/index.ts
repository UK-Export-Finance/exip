import { generateSicCodesValue } from '../../company-house-summary-list';
import { DEFAULT } from '../../../../content-strings';
import { ApplicationExporterSicCodes } from '../../../../../types';

/**
 * sicCodeMapping
 * maps application sic code response to generate a string of the sic code values
 * @param {Array<ApplicationExporterSicCodes>} applicationSicCodes
 * @returns {String} sicCodes
 */
const sicCodeMapping = (applicationSicCodes?: Array<ApplicationExporterSicCodes>) => {
  if (!applicationSicCodes || !applicationSicCodes.length) {
    return DEFAULT.EMPTY;
  }

  const sicCodes = applicationSicCodes.map((eachSicCode) => String(eachSicCode.sicCode));

  return generateSicCodesValue(sicCodes);
};

export default sicCodeMapping;
