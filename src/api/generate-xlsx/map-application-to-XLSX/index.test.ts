import mapApplicationToXLSX from '.';
import ROW_SEPERATOR from './helpers/xlsx-row-seperator';
import mapKeyInformation from './map-introduction';
import mapExporterContactDetails from './map-exporter-contact-details';
import mapEligibility from './map-eligibility';
import mapSecondaryKeyInformation from './map-key-information';
import mapPolicy from './map-policy';
import mapExporterBusiness from './map-exporter-business';
import mapBuyer from './map-buyer';
import mapExportContract from './map-export-contract';
import mapDeclarations from './map-declarations';
import { generateSubmittedApplication } from '../../test-helpers';
import { Application } from '../../types';

describe('api/generate-xlsx/map-application-to-xlsx/index', () => {
  let submittedApplication: Application;

  beforeEach(async () => {
    submittedApplication = await generateSubmittedApplication();
  });

  it('should return an array of mappings and section breaks', () => {
    const result = mapApplicationToXLSX(submittedApplication);

    const expected = [
      ...mapKeyInformation(submittedApplication),

      ROW_SEPERATOR,

      ...mapExporterContactDetails(submittedApplication),

      ROW_SEPERATOR,

      ...mapSecondaryKeyInformation(submittedApplication),

      ROW_SEPERATOR,

      ...mapEligibility(submittedApplication),

      ROW_SEPERATOR,

      ...mapExporterBusiness(submittedApplication),

      ROW_SEPERATOR,

      ...mapPolicy(submittedApplication),

      ROW_SEPERATOR,

      ...mapBuyer(submittedApplication),

      ROW_SEPERATOR,

      ...mapExportContract(submittedApplication),

      ROW_SEPERATOR,

      ...mapDeclarations(submittedApplication),
    ];

    expect(result).toEqual(expected);
  });
});
