const EXPORTER_BUSINESS = {
  COMPANY_HOUSE: {
    SEARCH: 'companiesHouseSearch',
    INPUT: 'companiesHouseNumber',
    COMPANY_NAME: 'companyName',
    COMPANY_ADDRESS: 'registeredOfficeAddress',
    COMPANY_NUMBER: 'companyNumber',
    COMPANY_INCORPORATED: 'dateOfCreation',
    COMPANY_SIC: 'sicCodes',
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
  YOUR_COMPANY: {
    YOUR_BUSINESS: 'yourBusiness',
    TRADING_ADDRESS: 'hasTradingAddress',
    TRADING_NAME: 'hasTradingName',
    WEBSITE: 'companyWebsite',
    PHONE_NUMBER: 'phoneNumber',
  },
  NATURE_OF_YOUR_BUSINESS: {
    GOODS_OR_SERVICES: 'goodsOrServicesSupplied',
    YEARS_EXPORTING: 'totalYearsExporting',
    EMPLOYEES_UK: 'totalEmployeesUK',
    EMPLOYEES_INTERNATIONAL: 'totalEmployeesInternational',
  },
  TURNOVER: {
    FINANCIAL_YEAR_END_DATE: 'financialYearEndDate',
    ESTIMATED_ANNUAL_TURNOVER: 'estimatedAnnualTurnover',
    PERCENTAGE_TURNOVER: 'exportsTurnoverPercentage',
  },
  BROKER: {
    USING_BROKER: 'usingBroker',
  },
};

export default EXPORTER_BUSINESS;
