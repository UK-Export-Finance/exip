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
  industrySectorName: string;
}

export { CompanyDetails, SicCode };
