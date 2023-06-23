import { CompaniesHouseResponse } from '../types';

const mockCompaniesHouseAPIResponse = {
  company_name: 'Mock company',
  company_number: '123456',
  registered_office_address: {
    care_of: undefined,
    premises: undefined,
    address_line_1: 'Test road',
    locality: 'Test',
    region: 'Test',
    postal_code: 'SW1A 2HQ',
    country: undefined,
  },
  date_of_creation: '2012-08-23',
  sic_codes: ['68201'],
} as CompaniesHouseResponse;

export default mockCompaniesHouseAPIResponse;
