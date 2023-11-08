import mockCountries from './mock-countries';
import mockCompany from './mock-company';
import { COVER_PERIOD, TOTAL_CONTRACT_VALUE } from '../constants';
import { InsuranceEligibility } from '../../types';

const mockEligibility = {
  buyerCountry: mockCountries[0],
  hasMinimumUkGoodsOrServices: true,
  validExporterLocation: true,
  hasCompaniesHouseNumber: true,
  companiesHouseNumber: mockCompany.companyNumber,
  totalValueInsured: 3,
  wantCoverOverMaxPeriod: false,
  coverPeriod: {
    value: 'Mock value',
    valueId: COVER_PERIOD.LESS_THAN_2_YEARS.DB_ID,
  },
  totalContractValue: {
    value: 'Mock value',
    valueId: TOTAL_CONTRACT_VALUE.LESS_THAN_500K.DB_ID,
  },
} as InsuranceEligibility;

export default mockEligibility;
