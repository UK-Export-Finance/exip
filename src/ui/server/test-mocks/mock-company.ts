import { CompanyHouseResponse } from '../../types';

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
} as CompanyHouseResponse;

export default mockCompany;
