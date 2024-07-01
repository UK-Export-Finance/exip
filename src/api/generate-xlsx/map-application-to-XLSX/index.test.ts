import mapApplicationToXLSX from '.';
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
import { generateSubmittedApplication } from '../../test-helpers';
import { mockCountries } from '../../test-mocks';
import { Application } from '../../types';

const {
  APPLICATION_INFORMATION,
  ELIGIBILITY,
  EXPORTER_BUSINESS,
  POLICY,
  BUYER,
  EXPORT_CONTRACT,
  DECLARATIONS,
} = SECTION_NAMES;

describe('api/generate-xlsx/map-application-to-xlsx/index', () => {
  let submittedApplication: Application;

  beforeEach(async () => {
    submittedApplication = await generateSubmittedApplication();
  });

  it('should return an array of mappings and section breaks', () => {
    const result = mapApplicationToXLSX(submittedApplication, mockCountries);

    const expected = {
      [APPLICATION_INFORMATION]: [
        ...mapIntroduction(submittedApplication),
        ...mapExporterContactDetails(submittedApplication),
        ...mapKeyInformation(submittedApplication),
      ],
      [ELIGIBILITY]: mapEligibility(submittedApplication),
      [EXPORTER_BUSINESS]: mapExporterBusiness(submittedApplication),
      [POLICY]: mapPolicy(submittedApplication, mockCountries),
      [BUYER]: mapBuyer(submittedApplication),
      [EXPORT_CONTRACT]: mapExportContract(submittedApplication, mockCountries),
      [DECLARATIONS]: mapDeclarations(submittedApplication),
    };

    expect(result).toEqual(expected);
  });
});
