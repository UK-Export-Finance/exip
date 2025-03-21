const EXPORTER_BUSINESS = {
  COMPANIES_HOUSE: {
    INPUT: 'companiesHouseNumber',
    COMPANY_NAME: 'companyName',
    COMPANY_ADDRESS: 'registeredOfficeAddress',
    COMPANY_NUMBER: 'companyNumber',
    COMPANY_INCORPORATED: 'dateOfCreation',
    COMPANY_SIC: 'sicCodes',
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
  YOUR_COMPANY: {
    YOUR_BUSINESS: 'yourBusiness',
    HAS_DIFFERENT_TRADING_ADDRESS: 'hasDifferentTradingAddress',
    HAS_DIFFERENT_TRADING_NAME: 'hasDifferentTradingName',
    DIFFERENT_TRADING_NAME: 'differentTradingName',
    WEBSITE: 'companyWebsite',
    PHONE_NUMBER: 'phoneNumber',
  },
  ALTERNATIVE_TRADING_ADDRESS: {
    FULL_ADDRESS: 'fullAddress',
    FULL_ADDRESS_DOT_NOTATION: 'alternativeTrading.fullAddress',
  },
  NATURE_OF_YOUR_BUSINESS: {
    GOODS_OR_SERVICES: 'goodsOrServicesSupplied',
    YEARS_EXPORTING: 'totalYearsExporting',
    EMPLOYEES_UK: 'totalEmployeesUK',
  },
  TURNOVER: {
    FINANCIAL_YEAR_END_DATE: 'financialYearEndDate',
    ESTIMATED_ANNUAL_TURNOVER: 'estimatedAnnualTurnover',
    PERCENTAGE_TURNOVER: 'exportsTurnoverPercentage',
    TURNOVER_CURRENCY_CODE: 'turnoverCurrencyCode',
  },
  HAS_CREDIT_CONTROL: 'hasCreditControlProcess',
};

export default EXPORTER_BUSINESS;
