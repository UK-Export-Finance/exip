import ROW_SEPERATOR from './helpers/csv-row-seperator';
import mapReferenceNumberAndDates from './map-reference-number-and-dates';
import mapEligibility from './map-eligibility';
import mapPolicyAndExport from './map-policy-and-export';
import mapExporter from './map-exporter';
import mapBuyer from './map-buyer';
import { Application } from '../../types';

const mapApplicationToCsv = (application: Application) => {
  const mapped = [
    ROW_SEPERATOR,

    ...mapReferenceNumberAndDates(application),

    ROW_SEPERATOR,

    ...mapEligibility(application),

    ROW_SEPERATOR,

    ...mapPolicyAndExport(application),

    ROW_SEPERATOR,

    ...mapExporter(application),

    ROW_SEPERATOR,

    ...mapBuyer(application),
  ];

  return mapped;
};

export default mapApplicationToCsv;
