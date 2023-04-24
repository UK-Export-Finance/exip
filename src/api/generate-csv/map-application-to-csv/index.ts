import ROW_SEPERATOR from './helpers/csv-row-seperator';
import mapKeyInformation from './map-key-information';
import mapSecondaryKeyInformation from './map-secondary-key-information';
import mapPolicyAndExport from './map-policy-and-export';
import mapExporter from './map-exporter';
import mapBuyer from './map-buyer';
import mapEligibility from './map-eligibility';
import { Application } from '../../types';

/**
 * mapApplicationToCsv
 * Map application fields into an array of objects for CSV generation
 * @param {Object} Application
 * @returns {Array} Array of objects for CSV generation
 */
const mapApplicationToCsv = (application: Application) => {
  try {
    const mapped = [
      ROW_SEPERATOR,

      ...mapKeyInformation(application),

      ROW_SEPERATOR,

      ...mapSecondaryKeyInformation(application),

      ROW_SEPERATOR,

      ...mapPolicyAndExport(application),

      ROW_SEPERATOR,

      ...mapExporter(application),

      ROW_SEPERATOR,

      ...mapBuyer(application),

      ROW_SEPERATOR,

      ...mapEligibility(application),
    ];

    return mapped;
  } catch (err) {
    console.error(err);

    throw new Error(`Mapping application to CSV ${err}`);
  }
};

export default mapApplicationToCsv;
