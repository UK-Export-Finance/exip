import { CompanyHouseResponse } from '../../types';

const mockCompany = {
  companyName: 'Mock company',
  companyNumber: '123456',
  registeredOfficeAddress: {
    addressLine1: 'Test road',
    locality: 'Test',
    region: 'Test',
    postalCode: 'SW1A 2AA',
  },
  dateOfCreation: '2012-08-23',
  sicCodes: ['68201'],
  success: true,
} as CompanyHouseResponse;

export default mockCompany;
