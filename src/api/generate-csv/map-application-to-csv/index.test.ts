import mapApplicationToCsv from '.';
import ROW_SEPERATOR from './helpers/csv-row-seperator';
import mapReferenceNumberAndDates from './map-reference-number-and-dates';
import mapEligibility from './map-eligibility';
import mapPolicyAndExport from './map-policy-and-export';
import mapExporter from './map-exporter';
import mapBuyer from './map-buyer';
import { mockApplication } from '../../test-mocks';

describe('api/generate-csv/map-application-to-csv/index', () => {
  it('should return an array of mappings and section breaks', () => {
    const result = mapApplicationToCsv(mockApplication);

    const expected = [
      ROW_SEPERATOR,

      ...mapReferenceNumberAndDates(mockApplication),

      ROW_SEPERATOR,

      ...mapEligibility(mockApplication),

      ROW_SEPERATOR,

      ...mapPolicyAndExport(mockApplication),

      ROW_SEPERATOR,

      ...mapExporter(mockApplication),

      ROW_SEPERATOR,

      ...mapBuyer(mockApplication),
    ];

    expect(result).toEqual(expected);
  });
});
