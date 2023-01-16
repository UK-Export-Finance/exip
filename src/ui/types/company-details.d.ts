import { SummaryListItemData, SummaryListField } from './summary-list';

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

export { CompanyDetails, CompanyDetailsFieldGroups };
