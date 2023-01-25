import { SummaryListItemData } from './summary-list';

interface CompanyDetails {
  companyRegistration?: string;
  companyName?: string;
  companyAddress?: string;
  companyIncorporated?: string;
  companySIC?: string;
}

interface SicCode {
  id: string;
  sicCode: string;
}

export { CompanyDetails, SicCode };
