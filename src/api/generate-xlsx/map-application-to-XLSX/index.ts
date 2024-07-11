import SECTION_NAMES from '../../constants/XLSX-CONFIG/SECTION_NAMES';
import mapIntroduction from './map-introduction';
import mapExporterContactDetails from './map-exporter-contact-details';
import mapEligibility from './map-eligibility';
import mapKeyInformation from './map-key-information';
import mapPolicy from './map-policy';
import mapExporterBusiness from './map-exporter-business';
import mapBuyer from './map-buyer';
import mapExportContract from './map-export-contract';
import mapDeclarations from './map-declarations';
import { Application, Country } from '../../types';

const {
  APPLICATION_INFORMATION,
  ELIGIBILITY,
  EXPORTER_BUSINESS,
  POLICY,
  BUYER,
  EXPORT_CONTRACT,
  DECLARATIONS,
} = SECTION_NAMES;

/**
 * mapApplicationToXLSX
 * Map application fields into an array of objects for XLSX generation
 * @param {Application} application
 * @param {Array<Country>} countries
 * @returns {Array<object>} Array of objects for XLSX generation
 */
const mapApplicationToXLSX = (application: Application, countries: Array<Country>) => {
  try {
    const mapped = {
      [APPLICATION_INFORMATION]: [
        ...mapIntroduction(application),
        ...mapExporterContactDetails(application),
        ...mapKeyInformation(application),
      ],
      [ELIGIBILITY]: mapEligibility(application),
      [EXPORTER_BUSINESS]: mapExporterBusiness(application),
      [POLICY]: mapPolicy(application, countries),
      [BUYER]: mapBuyer(application),
      [EXPORT_CONTRACT]: mapExportContract(application, countries),
      [DECLARATIONS]: mapDeclarations(application),
    };

    return mapped;
  } catch (err) {
    console.error('Error mapping application to XLSX %O', err);

    throw new Error(`Mapping application to XLSX ${err}`);
  }
};

export default mapApplicationToXLSX;
