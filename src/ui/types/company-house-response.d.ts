import { SicCode } from './sic-code';

interface CompaniesHouseAddress {
  careOf: string | null;
  premises: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  locality: string | null;
  region: string | null;
  postalCode: string | null;
  country: string | null;
}

interface CompaniesHouseResponse {
  companyRegistration?: string;
  companyName?: string;
  companyNumber: string;
  companyAddress?: string;
  companyIncorporated?: string;
  registeredOfficeAddress: CompaniesHouseAddress;
  sicCodes?: Array<SicCode>;
  isActive?: boolean;
  success?: boolean;
  apiError?: boolean;
  notFound?: boolean;
  __typename?: string;
}

export { CompaniesHouseAddress, CompaniesHouseResponse };
