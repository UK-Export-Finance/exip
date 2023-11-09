import { Address } from '../address';
import { ConnectObj, SuccessResponse } from '../generic';

export interface CompaniesHouseAccountReferenceDate {
  month: string;
  day: string;
}

export interface CompaniesHouseAPIAddress {
  care_of?: string;
  premises?: string;
  address_line_1?: string;
  address_line_2?: string;
  locality?: string;
  region?: string;
  postal_code?: string;
  country?: string;
}

export interface CompaniesHouseAccounts {
  accounting_reference_date: CompaniesHouseAccountReferenceDate;
}

export interface CompaniesHouseResponse {
  company_name: string;
  company_number: string;
  company_status: string;
  registered_office_address: CompaniesHouseAPIAddress;
  date_of_creation: string;
  sic_codes: Array<string>;
  accounts: CompaniesHouseAccounts;
  notFound?: boolean;
}

export interface CompaniesHouseAPIResponse extends SuccessResponse {
  data?: CompaniesHouseResponse;
  notFound?: boolean;
}

export interface GetCompaniesHouseInformationVariables {
  companiesHouseNumber: string;
}

export interface IndustrySector {
  id?: number;
  ukefIndustryId?: string;
  ukefIndustryName: string;
}

interface MappedCompaniesHouseAddress extends Address {
  locality?: string;
  region?: string;
}

export interface MappedCompaniesHouseResponse {
  companyName: string;
  registeredOfficeAddress: MappedCompaniesHouseAddress;
  companyNumber: string;
  dateOfCreation: string;
  sicCodes: Array<string>;
}

export interface SicCode {
  sicCode: string;
  industrySectorName: string;
  company: ConnectObj;
  application: ConnectObj;
}
