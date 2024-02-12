import mockCountries from './mock-countries';

const mockJointlyInsuredParty = {
  id: '123',
  requested: false,
  companyName: 'Mock company name',
  companyNumber: 'Mock company number',
  country: mockCountries[0].isoCode,
};

export default mockJointlyInsuredParty;
