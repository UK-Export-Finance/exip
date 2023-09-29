import mapApplicationToXLSX from '.';
import ROW_SEPERATOR from './helpers/xlsx-row-seperator';
import mapKeyInformation from './map-key-information';
import mapSecondaryKeyInformation from './map-secondary-key-information';
import mapPolicyAndExport from './map-policy-and-export';
import mapExporter from './map-exporter';
import mapBuyer from './map-buyer';
import mapEligibility from './map-eligibility';
import { mockApplication } from '../../test-mocks';

describe('api/generate-xlsx/map-application-to-xlsx/index', () => {
  it('should return an array of mappings and section breaks', () => {
    const result = mapApplicationToXLSX(mockApplication);

    const expected = [
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
