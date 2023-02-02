import createFullTimestampFromDayAndMonth from './create-full-timestamp-from-day-month';
interface CompaniesHouseAddress {
  care_of: string | null;
  premises: string | null;
  address_line_1: string | null;
  address_line_2: string | null;
  locality: string | null;
  region: string | null;
  postal_code: string | null;
  country: string | null;
}

interface CompaniesHouseAccountReferenceDate {
  month: string;
  day: string;
}

interface CompaniesHouseAccounts {
  accounting_reference_date: CompaniesHouseAccountReferenceDate;
}

interface CompanyHouseResponse {
  company_name: string;
  registered_office_address: CompaniesHouseAddress;
  company_number: string;
  date_of_creation: string;
  sic_codes: Array<string>;
  success: boolean;
  apiError: boolean;
  accounts: CompaniesHouseAccounts;
}

/**
 * mapping function to change names to camel case
 * response from companies house API does not follow camel case so requires mapping and conversion
 */
const mapCompaniesHouseFields = (companiesHouseResponse: CompanyHouseResponse) => {
  return {
    companyName: companiesHouseResponse.company_name,
    registeredOfficeAddress: {
      careOf: companiesHouseResponse.registered_office_address.care_of,
      premises: companiesHouseResponse.registered_office_address.premises,
      addressLine1: companiesHouseResponse.registered_office_address.address_line_1,
      addressLine2: companiesHouseResponse.registered_office_address.address_line_2,
      locality: companiesHouseResponse.registered_office_address.locality,
      region: companiesHouseResponse.registered_office_address.region,
      postalCode: companiesHouseResponse.registered_office_address.postal_code,
      country: companiesHouseResponse.registered_office_address.country,
    },
    companyNumber: companiesHouseResponse.company_number,
    dateOfCreation: companiesHouseResponse.date_of_creation,
    sicCodes: companiesHouseResponse.sic_codes,
    // creates timestamp for financialYearEndDate from day and month if exist
    financialYearEndDate: createFullTimestampFromDayAndMonth(
      companiesHouseResponse.accounts?.accounting_reference_date?.day,
      companiesHouseResponse.accounts?.accounting_reference_date?.month,
    ),
  };
};

export { mapCompaniesHouseFields, CompanyHouseResponse };
