interface CompaniesHouseAddress {
  careOf: string | null;
  premises: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  locality: string | null;
  region: string | null;
  postalCode: string | null;
  country: string | null;
}

interface CompanyHouseResponse {
  companyName: string;
  registeredOfficeAddress: CompaniesHouseAddress;
  companyNumber: string;
  dateOfCreation: string;
  sicCodes: Array<string>;
  industrySectorNames: Array<string>;
  success: boolean;
  apiError: boolean;
}

export { CompanyHouseResponse };
