import { CompaniesHouseAddress } from './company-house-response';

interface Company {
  companyRegistration?: string;
  companyName?: string;
  companyNumber?: string;
  companyAddress?: string;
  companyIncorporated?: string;
  registeredOfficeAddress: CompaniesHouseAddress;
  sicCodes?: Array<string>;
  industrySectorNames?: Array<string>;
  isActive?: boolean;
  __typename?: string;
}

export { Company };
