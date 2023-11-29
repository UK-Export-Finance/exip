import mockCompany from './mock-company';
import { CompaniesHouseResponse } from '../../types';

const mockCompaniesHouseResponse = {
  ...mockCompany,
  apiError: false,
} as CompaniesHouseResponse;

export default mockCompaniesHouseResponse;
