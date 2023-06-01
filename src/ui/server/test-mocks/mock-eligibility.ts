import mockCountries from './mock-countries';

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
};

export default mockEligibility;
