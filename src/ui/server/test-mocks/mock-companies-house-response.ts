import { CompanyHouseResponse } from '../../types';

const mockCompanyResponse = {
  companyName: 'Mock company',
  companyNumber: '123456',
  registeredOfficeAddress: {
    addressLineOne: 'Test road',
    locality: 'Test',
    region: 'Test',
    postalCode: 'SW1A 2AA',
  },
  dateOfCreation: '2012-08-23',
  sicCodes: ['68201'],
  success: true,
} as CompanyHouseResponse;

export default mockCompanyResponse;
