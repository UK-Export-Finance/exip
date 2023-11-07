import { MappedCompaniesHouseResponse } from '../types';

const mockCompany = {
  companyName: 'Mock company',
  companyNumber: '123456',
  registeredOfficeAddress: {
    careOf: '',
    premises: '',
    addressLine1: 'Test road',
    locality: 'Test',
    region: 'Test',
    postalCode: 'SW1A 2HQ',
    country: '',
  },
  dateOfCreation: '2012-08-23',
  sicCodes: ['68201'],
} as MappedCompaniesHouseResponse;

export default mockCompany;
