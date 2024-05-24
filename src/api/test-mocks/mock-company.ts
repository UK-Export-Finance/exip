import { ApplicationCompany, ApplicationCompanyCore } from '../types';

const mockId = 'claydon40148m8boyar9waen';

const mockCompany = {
  companyName: 'Mock company',
  companyNumber: '0A123456',
  registeredOfficeAddress: {
    careOf: '',
    premises: '',
    addressLine1: 'Test road',
    addressLine2: '',
    locality: 'Test',
    region: 'Test',
    postalCode: 'SW1A 2HQ',
    country: '',
  },
  dateOfCreation: new Date(),
  financialYearEndDate: new Date(),
  sicCodes: ['68201'],
  industrySectorNames: [],
  differentTradingAddress: {},
} as ApplicationCompanyCore;

const mockCompanyDifferentTradingAddress = {
  ...mockCompany,
  differentTradingAddress: {
    id: mockId,
    fullAddress: 'Mock address',
  },
};

const mockCompanyNoDifferentTradingAddress = {
  ...mockCompany,
  differentTradingAddress: {
    id: mockId,
    fullAddress: '',
  },
};

export const companyScenarios = {
  differentTradingAddressAndName: {
    ...mockCompany,
    ...mockCompanyDifferentTradingAddress,
    hasDifferentTradingName: true,
  } as ApplicationCompany,
  differentTradingAddressNoName: {
    ...mockCompany,
    ...mockCompanyDifferentTradingAddress,
    hasDifferentTradingName: false,
  } as ApplicationCompany,
  differentTradingNameNoAddress: {
    ...mockCompany,
    hasDifferentTradingName: true,
    ...mockCompanyNoDifferentTradingAddress,
  } as ApplicationCompany,
  noDifferentTradingNameOrAddress: {
    ...mockCompany,
    hasDifferentTradingName: false,
    ...mockCompanyNoDifferentTradingAddress,
  } as ApplicationCompany,
};

export default mockCompany;
