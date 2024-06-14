import ROW_SEPERATOR from './helpers/xlsx-row-seperator';
import mapIntroduction from './map-introduction';
import mapExporterContactDetails from './map-exporter-contact-details';
import mapEligibility from './map-eligibility';
import mapKeyInformation from './map-key-information';
import mapPolicy from './map-policy';
import mapExporterBusiness from './map-exporter-business';
import mapBuyer from './map-buyer';
import mapExportContract from './map-export-contract';
import mapDeclarations from './map-declarations';
import { Application } from '../../types';

/**
 * mapApplicationToXLSX
 * Map application fields into an array of objects for XLSX generation
 * @param {Application}
 * @returns {Array<object>} Array of objects for XLSX generation
 */
const mapApplicationToXLSX = (application: Application) => {
  try {
    const mapped = [
      ...mapIntroduction(application),

      ROW_SEPERATOR,

      ...mapExporterContactDetails(application),

      ROW_SEPERATOR,

      ...mapKeyInformation(application),

      ROW_SEPERATOR,

      ...mapEligibility(application),

      ROW_SEPERATOR,

      ...mapExporterBusiness(application),

      ROW_SEPERATOR,

      ...mapPolicy(application),

      ROW_SEPERATOR,

      ...mapBuyer(application),

      ROW_SEPERATOR,

      ...mapExportContract(application),

      ROW_SEPERATOR,

      ...mapDeclarations(application),
    ];

    return mapped;
  } catch (err) {
    console.error('Error mapping application to XLSX %O', err);

    throw new Error(`Mapping application to XLSX ${err}`);
  }
};

export default mapApplicationToXLSX;
