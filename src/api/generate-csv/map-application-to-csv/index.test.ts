import mapApplicationToCsv from '.';
import ROW_SEPERATOR from './helpers/csv-row-seperator';
import mapKeyInformation from './map-key-information';
import mapSecondaryKeyInformation from './map-secondary-key-information';
import mapPolicyAndExport from './map-policy-and-export';
import mapExporter from './map-exporter';
import mapBuyer from './map-buyer';
import mapEligibility from './map-eligibility';
import { mockApplication } from '../../test-mocks';

describe('api/generate-csv/map-application-to-csv/index', () => {
  it('should return an array of mappings and section breaks', () => {
    const result = mapApplicationToCsv(mockApplication);

    const expected = [
      ROW_SEPERATOR,

      ...mapKeyInformation(mockApplication),

      ROW_SEPERATOR,

      ...mapSecondaryKeyInformation(mockApplication),

      ROW_SEPERATOR,

      ...mapPolicyAndExport(mockApplication),

      ROW_SEPERATOR,

      ...mapExporter(mockApplication),

      ROW_SEPERATOR,

      ...mapBuyer(mockApplication),

      ROW_SEPERATOR,

      ...mapEligibility(mockApplication),
    ];

    expect(result).toEqual(expected);
  });
});
