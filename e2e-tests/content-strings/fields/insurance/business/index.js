import { FIELD_IDS } from '../../../../constants';

export const EXPORTER_BUSINESS_FIELDS = {
  [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.YOUR_COMPANY.HAS_DIFFERENT_TRADING_NAME]: {
    LABEL: 'Do you use a different trading name for this company?',
    SUMMARY: {
      TITLE: 'Different trading name?',
    },
  },
  [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.YOUR_COMPANY.DIFFERENT_TRADING_NAME]: {
    LABEL: "What's your organisation's alternative trading name?",
    HINT: 'Your official trading name will still be on the policy.',
  },
  [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.YOUR_COMPANY.TRADING_ADDRESS]: {
    LABEL: 'Do you trade from a different address to your registered office address for this company?',
    SUMMARY: {
      TITLE: 'Different trading address?',
    },
  },
  [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.YOUR_COMPANY.WEBSITE]: {
    LABEL: 'Enter your company website, if you have one (optional)',
    SUMMARY: {
      TITLE: 'Company website (optional)',
    },
  },
  [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.YOUR_COMPANY.PHONE_NUMBER]: {
    LABEL: 'Your UK telephone number (optional)',
    HINT: 'We may need to contact you about your application',
    SUMMARY: {
      TITLE: 'UK telephone number (optional)',
    },
  },
  [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS.FULL_ADDRESS]: {
    LABEL: "What's your alternative trading address?",
    MAXIMUM: 1000,
    REGISTERED_OFFICE_ADDRESS_HEADING: 'Your registered office address',
    REGISTERED_OFFICE_ADDRESS_HINT: 'This information comes from Companies House.',
  },
  NATURE_OF_YOUR_BUSINESS: {
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS.GOODS_OR_SERVICES]: {
      LABEL: 'Tell us about your business',
      HINT: "Give us an overview of the work you do, as well as the products or services you're getting credit insurance for.",
      MAXIMUM: 1000,
      SUMMARY: {
        TITLE: 'Goods or services your business supplies',
      },
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS.YEARS_EXPORTING]: {
      LABEL: 'How many years have you been exporting for?',
      HINT: 'Round to the nearest year',
      SUFFIX: 'Years',
      SUMMARY: {
        TITLE: 'Years exporting',
      },
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS.EMPLOYEES_UK]: {
      LEGEND: 'How many employees do you have in the UK?',
      SUMMARY: {
        TITLE: 'UK employees',
      },
    },
  },
  TURNOVER: {
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.TURNOVER.FINANCIAL_YEAR_END_DATE]: {
      LABEL: 'Your financial year end date',
      HINT: 'This information comes from Companies House',
      DATE_FORMAT: 'd MMMM',
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.TURNOVER.ESTIMATED_ANNUAL_TURNOVER]: {
      LEGEND: 'Estimated annual turnover for this current financial year',
      LABEL: 'Estimate this to the nearest pound. Do not use decimal points.',
      PREFIX: '£',
      SUMMARY: {
        TITLE: 'Estimated turnover this current financial year',
      },
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.TURNOVER.PERCENTAGE_TURNOVER]: {
      LABEL: 'Percentage of turnover from exports',
      SUFFIX: '%',
      SUMMARY: {
        TITLE: 'Percentage of turnover from exports',
      },
    },
  },
  [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.HAS_CREDIT_CONTROL]: {
    HINT: 'These are often called credit control processes. They may be managed by your legal or financial team.',
    SUMMARY: {
      TITLE: 'Process for managing late payments',
    },
  },
};
