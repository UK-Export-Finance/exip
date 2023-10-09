import mapApplicationToXLSX from '.';
import ROW_SEPERATOR from './helpers/xlsx-row-seperator';
import mapKeyInformation from './map-key-information';
import mapExporterContactDetails from './map-exporter-contact-details';
import mapSecondaryKeyInformation from './map-secondary-key-information';
import mapPolicyAndExport from './map-policy-and-export';
import mapExporter from './map-exporter';
import mapBuyer from './map-buyer';
import mapEligibility from './map-eligibility';
import getPopulatedApplication from '../../helpers/get-populated-application';
import { createFullApplication, getKeystoneContext, mapApplicationIds } from '../../test-helpers';
import { Application } from '../../types';

describe('api/generate-xlsx/map-application-to-xlsx/index', () => {
  let submittedApplication: Application;

  beforeEach(async () => {
    const context = getKeystoneContext();
    const application = await createFullApplication(context);

    const applicationIds = mapApplicationIds(application);
    const populatedApplication = await getPopulatedApplication(context, applicationIds);

    submittedApplication = {
      ...populatedApplication,
      submissionDate: new Date(),
    };
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

      ...mapPolicyAndExport(submittedApplication),

      ROW_SEPERATOR,

      ...mapExporter(submittedApplication),

      ROW_SEPERATOR,

      ...mapBuyer(submittedApplication),

      ROW_SEPERATOR,

      ...mapEligibility(submittedApplication),
    ];

    expect(result).toEqual(expected);
  });
});
