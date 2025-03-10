import { Company } from '../../types';
import mockSicCodes from './mock-sic-codes';

const mockCompany = {
  companyName: 'Mock company',
  companyNumber: '123456',
  registeredOfficeAddress: {
    careOf: null,
    premises: null,
    addressLine1: 'Test road',
    addressLine2: '',
    locality: 'Test',
    region: 'Test',
    postalCode: 'SW1A 2HQ',
    country: null,
  },
  dateOfCreation: '2012-08-23',
  sicCodes: [mockSicCodes[0]],
  industrySectorNames: [],
  isActive: true,
  __typename: 'Company',
} as Company;

export default mockCompany;
