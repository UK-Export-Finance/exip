import createFullTimestampFromDayAndMonth from '../create-full-timestamp-from-day-month';
import mapSicCodeDescriptions from '../map-sic-code-descriptions';
import { IndustrySector, CompaniesHouseResponse } from '../../types';

/**
 * mapping function to change names to camel case
 * response from companies house API does not follow camel case so requires mapping and conversion
 */
const mapCompaniesHouseFields = (companiesHouseResponse: CompaniesHouseResponse, sectors: Array<IndustrySector>) => {
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
    industrySectorNames: mapSicCodeDescriptions(companiesHouseResponse.sic_codes, sectors),
    // creates timestamp for financialYearEndDate from day and month if exist
    financialYearEndDate: createFullTimestampFromDayAndMonth(
      companiesHouseResponse.accounts?.accounting_reference_date?.day,
      companiesHouseResponse.accounts?.accounting_reference_date?.month,
    ),
  };
};

export { mapCompaniesHouseFields };
