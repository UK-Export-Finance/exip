import mockCountries from './mock-countries';
import { InsuranceEligibility } from '../../types';

const mockEligibility = {
  buyerCountry: mockCountries[0],
  hasMinimumUkGoodsOrServices: true,
  validExporterLocation: true,
  hasCompaniesHouseNumber: true,
  wantCoverOverMaxAmount: false,
  wantCoverOverMaxPeriod: false,
} as InsuranceEligibility;

export default mockEligibility;
