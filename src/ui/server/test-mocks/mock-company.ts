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
    postalCode: 'SW1A 2AA',
    country: null,
  },
  dateOfCreation: '2012-08-23',
  sicCodes: ['68201'],
  success: true,
  apiError: false,
} as CompanyHouseResponse;

export default mockCompany;
