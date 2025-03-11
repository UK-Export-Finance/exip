import { CompaniesHouseAddress } from './company-house-response';
import { SicCode } from './sic-code';

interface Company {
  companyRegistration?: string;
  companyName?: string;
  companyNumber?: string;
  companyAddress?: string;
  companyIncorporated?: string;
  registeredOfficeAddress?: CompaniesHouseAddress;
  sicCodes: Array<SicCode>;
  industrySectorNames?: Array<string>;
  isActive?: boolean;
  dateOfCreation?: Date | string;
  __typename?: string;
}

export { Company };
