import mockCountries from './mock-countries';
import { COMPANIES_HOUSE_NUMBER } from '../constants/companies-house-number-examples';
import { COVER_PERIOD, TOTAL_CONTRACT_VALUE } from '../constants';
import { InsuranceEligibility } from '../../types';

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
  company: {
    id: 'clcyyopn40148m8noyar9wxrn',
    companyName: 'Mock name',
    companyNumber: '0123456',
    companyWebsite: '',
    hasDifferentTradingName: false,
    hasDifferentTradingAddress: false,
    dateOfCreation: '2014-04-10T00:00:00.000Z',
    registeredOfficeAddress: {
      id: 'clcyyopna0158m8noaglyy94t',
      addressLine1: 'Line 1',
      addressLine2: 'Line 2',
      careOf: '',
      locality: 'Locality',
      region: 'Region',
      postalCode: 'Post code',
      country: '',
      premises: '',
      __typename: 'CompanyAddress',
    },
    financialYearEndDate: new Date(),
    __typename: 'Company',
  },
  hasReviewedEligibility: true,
} as InsuranceEligibility;

export default mockEligibility;
