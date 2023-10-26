const SHARED_FIELD_IDS = {
  COMPANY: 'company',
  COMPANIES_HOUSE: {
    COMPANY_NAME: 'companyName',
    COMPANY_ADDRESS: 'registeredOfficeAddress',
    COMPANY_NUMBER: 'companyNumber',
    COMPANY_INCORPORATED: 'dateOfCreation',
    SIC_CODE: 'sicCode',
    COMPANY_SIC: 'sicCodes',
    OLD_SIC_CODES: 'oldSicCodes',
    INDUSTRY_SECTOR_NAME: 'industrySectorName',
    INDUSTRY_SECTOR_NAMES: 'industrySectorNames',
    FINANCIAL_YEAR_END_DATE: 'financialYearEndDate',
    REGISTED_OFFICE_ADDRESS: {
      ADDRESS_LINE_1: 'addressLine1',
      ADDRESS_LINE_2: 'addressLine2',
      CARE_OF: 'careOf',
      LOCALITY: 'locality',
      REGION: 'region',
      POSTAL_CODE: 'postalCode',
      COUNTRY: 'country',
      PREMISES: 'premises',
    },
  },
};

export default SHARED_FIELD_IDS;
