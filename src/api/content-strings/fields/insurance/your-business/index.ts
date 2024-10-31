import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';

const {
  COMPANIES_HOUSE: { COMPANY_NAME, COMPANY_NUMBER, COMPANY_INCORPORATED, COMPANY_SIC, COMPANY_ADDRESS, FINANCIAL_YEAR_END_DATE },
  EXPORTER_BUSINESS,
} = INSURANCE_FIELD_IDS;
const {
  YOUR_COMPANY: { HAS_DIFFERENT_TRADING_ADDRESS, HAS_DIFFERENT_TRADING_NAME, PHONE_NUMBER, WEBSITE },
  ALTERNATIVE_TRADING_ADDRESS: { FULL_ADDRESS },
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK },
  TURNOVER: { ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER },
  HAS_CREDIT_CONTROL,
} = EXPORTER_BUSINESS;

export const EXPORTER_BUSINESS_FIELDS = {
  COMPANY_DETAILS: {
    [COMPANY_NUMBER]: {
      SUMMARY: {
        TITLE: 'Companies House registration number',
      },
    },
    [COMPANY_NAME]: {
      SUMMARY: {
        TITLE: 'Company name',
      },
    },
    [COMPANY_ADDRESS]: {
      SUMMARY: {
        TITLE: 'Registered office address',
      },
    },
    [COMPANY_INCORPORATED]: {
      SUMMARY: {
        TITLE: 'Date incorporated',
      },
    },
    [COMPANY_SIC]: {
      SUMMARY: {
        TITLE: 'Standard industry classification (SIC) codes and nature of business',
      },
    },
    [FINANCIAL_YEAR_END_DATE]: {
      SUMMARY: {
        TITLE: 'Financial year end date',
      },
    },
    [HAS_DIFFERENT_TRADING_NAME]: {
      SUMMARY: {
        TITLE: 'Different trading name',
      },
    },
    [HAS_DIFFERENT_TRADING_ADDRESS]: {
      SUMMARY: {
        TITLE: 'Different trading address',
      },
    },
    [WEBSITE]: {
      SUMMARY: {
        TITLE: 'Company website (optional)',
      },
    },
    [PHONE_NUMBER]: {
      SUMMARY: {
        TITLE: 'UK telephone number (optional)',
      },
    },
  },
  [FULL_ADDRESS]: {
    LABEL: "What's your alternative trading address?",
  },
  NATURE_OF_YOUR_BUSINESS: {
    [GOODS_OR_SERVICES]: {
      SUMMARY: {
        TITLE: 'Goods or services your business supplies',
      },
    },
    [YEARS_EXPORTING]: {
      SUMMARY: {
        TITLE: 'Years exporting',
      },
    },
    [EMPLOYEES_UK]: {
      SUMMARY: {
        TITLE: 'Number of UK employees',
      },
    },
  },
  TURNOVER: {
    [ESTIMATED_ANNUAL_TURNOVER]: {
      SUMMARY: {
        TITLE: 'Estimated turnover this current financial year',
      },
    },
    [PERCENTAGE_TURNOVER]: {
      SUMMARY: {
        TITLE: 'Percentage of turnover from exports',
      },
    },
  },
  [HAS_CREDIT_CONTROL]: {
    SUMMARY: {
      TITLE: 'Process for managing late payments',
    },
  },
};
