const EXPORTER_BUSINESS = {
  BUSINESS: 'business',
  YOUR_COMPANY: {
    ADDRESS: 'address',
    YOUR_BUSINESS: 'yourBusiness',
    HAS_DIFFERENT_TRADING_ADDRESS: 'hasDifferentTradingAddress',
    DIFFERENT_TRADING_ADDRESS: 'differentTradingAddress',
    HAS_DIFFERENT_TRADING_NAME: 'hasDifferentTradingName',
    WEBSITE: 'companyWebsite',
    PHONE_NUMBER: 'phoneNumber',
    DIFFERENT_TRADING_NAME: 'differentTradingName',
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
} as const;

export default EXPORTER_BUSINESS;
