import { SummaryListItemData } from './summary-list';

interface CompanyDetails {
  companyRegistration?: string;
  companyName?: string;
  companyAddress?: string;
  companyIncorporated?: string;
  companySIC?: string;
}

interface CompanyDetailsFieldGroups {
  COMPANY_DETAILS: Array<SummaryListItemData>;
}

interface SicCodeResponse {
  id: string;
  sicCode: string;
}

export { CompanyDetails, CompanyDetailsFieldGroups, SicCodeResponse };
