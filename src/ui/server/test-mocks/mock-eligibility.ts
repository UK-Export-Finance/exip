import mockCountries from './mock-countries';
import { COMPANIES_HOUSE_NUMBER } from '../constants/companies-house-number-examples';
import { COVER_PERIOD, TOTAL_CONTRACT_VALUE } from '../constants';
import { InsuranceEligibility } from '../../types';
import mockCompany from './mock-company';

// remove incompatible fields from mockCompany
const { industrySectorNames, ...company } = mockCompany;

const mockEligibility = {
  buyerCountry: mockCountries[0],
  hasMinimumUkGoodsOrServices: true,
  hasEndBuyer: false,
  validExporterLocation: true,
  hasCompaniesHouseNumber: true,
  companiesHouseNumber: COMPANIES_HOUSE_NUMBER,
  totalValueInsured: 3,
  coverPeriod: COVER_PERIOD.LESS_THAN_2_YEARS.DB_ID,
  totalContractValue: TOTAL_CONTRACT_VALUE.LESS_THAN_500K.DB_ID,
  company,
  hasReviewedEligibility: true,
  isPartyToConsortium: false,
  isMemberOfAGroup: false,
} as InsuranceEligibility;

export default mockEligibility;
