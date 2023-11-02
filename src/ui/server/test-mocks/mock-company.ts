import { CompaniesHouseResponse } from '../../types';

const mockCompany = {
  companyName: 'Mock company',
  companyNumber: '123456',
  registeredOfficeAddress: {
    careOf: null,
    premises: null,
    addressLine1: 'Test road',
    locality: 'Test',
    region: 'Test',
    postalCode: 'SW1A 2HQ',
    country: null,
  },
  dateOfCreation: '2012-08-23',
  sicCodes: ['68201'],
  industrySectorNames: ['test description'],
  isActive: true,
} as CompaniesHouseResponse;

export default mockCompany;
