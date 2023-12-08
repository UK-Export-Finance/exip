import { ApplicationCompanyCore } from '../types';

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
} as ApplicationCompanyCore;

export default mockCompany;
