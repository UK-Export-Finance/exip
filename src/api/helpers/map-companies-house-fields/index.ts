import createFullTimestampFromDayAndMonth from '../create-full-timestamp-from-day-month';
import mapSicCodeDescriptions from '../map-sic-code-descriptions';
import { EXTERNAL_API_DEFINITIONS } from '../../constants';
import { IndustrySector, CompaniesHouseResponse } from '../../types';

const {
  COMPANIES_HOUSE: { COMPANY_STATUS },
} = EXTERNAL_API_DEFINITIONS;

/**
 * mapCompaniesHouseFields
 * Change Companies House fields to be in camel case.
 * @param {CompaniesHouseResponse} Companies House response
 * @param {Array<IndustrySector>} Industry sectors
 * @returns {Object} Mapped companies house data
 */
const mapCompaniesHouseFields = (companiesHouseResponse: CompaniesHouseResponse, sectors: Array<IndustrySector>) => ({
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
  /**
   * Create a timestamp for financialYearEndDate
   * If day and month exist
   */
  financialYearEndDate: createFullTimestampFromDayAndMonth(
    companiesHouseResponse.accounts?.accounting_reference_date?.day,
    companiesHouseResponse.accounts?.accounting_reference_date?.month,
  ),
  isActive: companiesHouseResponse.company_status === COMPANY_STATUS.ACTIVE,
});

export { mapCompaniesHouseFields };
