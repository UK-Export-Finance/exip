import { SummaryListField, SummaryListItemData } from './summary-list';

interface CompanyDetails {
  companyRegistration?: SummaryListField;
  companyName?: SummaryListField;
  companyAddress?: SummaryListField;
  companyIncorporated?: SummaryListField;
  companySIC?: SummaryListField;
}

interface CompanyDetailsFieldGroups {
  COMPANY_DETAILS: Array<SummaryListItemData>;
}

interface SicCodeResponse {
  id: string;
  sicCode: string;
}

export { CompanyDetails, CompanyDetailsFieldGroups, SicCodeResponse };
