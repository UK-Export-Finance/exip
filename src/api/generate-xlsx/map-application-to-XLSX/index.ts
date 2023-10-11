import ROW_SEPERATOR from './helpers/xlsx-row-seperator';
import mapKeyInformation from './map-key-information';
import mapExporterContactDetails from './map-exporter-contact-details';
import mapSecondaryKeyInformation from './map-secondary-key-information';
import mapPolicyAndExport from './map-policy-and-export';
import mapExporter from './map-exporter';
import mapBuyer from './map-buyer';
import mapEligibility from './map-eligibility';
import { Application } from '../../types';

/**
 * mapApplicationToXLSX
 * Map application fields into an array of objects for XLSX generation
 * @param {Application}
 * @returns {Array} Array of objects for XLSX generation
 */
const mapApplicationToXLSX = (application: Application) => {
  try {
    const mapped = [
      ...mapKeyInformation(application),

      ROW_SEPERATOR,

      ...mapExporterContactDetails(application),

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
    console.error('Error mapping application to XLSX %O', err);

    throw new Error(`Mapping application to XLSX ${err}`);
  }
};

export default mapApplicationToXLSX;
