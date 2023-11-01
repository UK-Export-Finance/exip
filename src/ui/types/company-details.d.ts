import { CompaniesHouseAddress } from './company-house-response';

interface CompanyDetails {
  companyRegistration?: string;
  companyName?: string;
  companyAddress?: string;
  companyIncorporated?: string;
  registeredOfficeAddress?: CompaniesHouseAddress;
}

interface SicCode {
  id: string;
  sicCode: string;
  industrySectorName: string;
}

export { CompanyDetails, SicCode };
