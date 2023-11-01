import mockCountries from './mock-countries';
import mockCompany from './mock-company';
import { InsuranceEligibility } from '../../types';

const mockEligibility = {
  buyerCountry: mockCountries[0],
  hasMinimumUkGoodsOrServices: true,
  validExporterLocation: true,
  hasCompaniesHouseNumber: true,
  companiesHouseNumber: mockCompany.companyNumber,
  wantCoverOverMaxAmount: false,
  wantCoverOverMaxPeriod: false,
} as InsuranceEligibility;

export default mockEligibility;
