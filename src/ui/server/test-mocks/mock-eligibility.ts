import mockCountries from './mock-countries';
import { TOTAL_CONTRACT_VALUE } from '../constants';
import { InsuranceEligibility } from '../../types';

const mockEligibility = {
  buyerCountry: mockCountries[0],
  hasMinimumUkGoodsOrServices: true,
  validExporterLocation: true,
  hasCompaniesHouseNumber: true,
  otherPartiesInvolved: false,
  paidByLetterOfCredit: false,
  needPreCreditPeriodCover: false,
  wantCoverOverMaxAmount: false,
  wantCoverOverMaxPeriod: false,
  totalContractValue: {
    value: 'Mock value',
    valueId: TOTAL_CONTRACT_VALUE.LESS_THAN_500K.DB_ID,
  },
} as InsuranceEligibility;

export default mockEligibility;
