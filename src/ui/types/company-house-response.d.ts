interface CompaniesHouseAddress {
  careOf: string;
  premises: string;
  addressLineOne: string;
  addressLineTwo: string;
  locality: string;
  region: string;
  postalCode: string;
  country: string;
}

interface CompanyHouseResponse {
  companyName: string;
  registeredOfficeAddress: CompaniesHouseAddress;
  companyNumber: string;
  dateOfCreation: string;
  sicCodes: Array<string>;
  success: boolean;
  apiError: boolean;
}

export { CompanyHouseResponse };
