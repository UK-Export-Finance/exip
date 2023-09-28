import { ConnectObj, SuccessResponse } from '../generic';

export interface CompaniesHouseAccountReferenceDate {
  month: string;
  day: string;
}

export interface CompaniesHouseAccounts {
  accounting_reference_date: CompaniesHouseAccountReferenceDate;
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

export interface CompaniesHouseResponse {
  company_name: string;
  registered_office_address: CompaniesHouseAPIAddress;
  company_number: string;
  date_of_creation: string;
  sic_codes: Array<string>;
  accounts: CompaniesHouseAccounts;
}

export interface CompaniesHouseAPIResponse extends SuccessResponse {
  data?: CompaniesHouseResponse;
}

export interface GetCompaniesHouseInformationVariables {
  companiesHouseNumber: string;
}

export interface IndustrySector {
  id?: number;
  ukefIndustryId?: string;
  ukefIndustryName: string;
}

export interface MappedCompaniesHouseAddress {
  careOf?: string;
  premises?: string;
  addressLine1?: string;
  addressLine2?: string;
  locality?: string;
  region?: string;
  postalCode?: string;
  country?: string;
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
