import { FIELD_IDS } from '../../../../constants';

export const EXPORTER_BUSINESS_FIELDS = {
  [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.SUMMARY_LIST]: {
    LABEL: 'Your company',
    COMPANY_NUMBER: {
      text: 'Companies House registration number',
    },
    COMPANY_NAME: {
      text: 'Company name',
    },
    COMPANY_ADDRESS: {
      text: 'Registered office address',
    },
    COMPANY_INCORPORATED: {
      text: 'Incorporated on',
    },
    COMPANY_SIC: {
      text: 'Standard industrial classification (SIC) codes and nature of business',
    },
  },
  [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.INPUT]: {
    LABEL: 'Enter your Companies House registration number (CRN)',
    HINT: 'For example, 8989898 or SC907816. You\'ll find it on your incorporation certificate or on the Companies House website',
  },
  [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.YOUR_COMPANY.TRADING_NAME]: {
    LABEL: 'Do you use a different trading name for this company?',
  },
  [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.YOUR_COMPANY.TRADING_ADDRESS]: {
    LABEL: 'Do you trade from a different address to your registered office address for this company?',
  },
  [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.YOUR_COMPANY.WEBSITE]: {
    LABEL: 'Enter your company website, if you have one (optional)',
  },
  [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.YOUR_COMPANY.PHONE_NUMBER]: {
    LABEL: 'Your UK telephone number (optional)',
    HINT: 'We may need to contact you about your application',
  },

  NATURE_OF_YOUR_BUSINESS: {
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS.GOODS_OR_SERVICES]: {
      LABEL: 'What goods or services does your company supply?',
      HINT: 'Give a general overview rather than just the exports you want to insure',
      MAXIMUM: 1000,
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS.YEARS_EXPORTING]: {
      LABEL: 'How many years have you been exporting for?',
      HINT: 'Round to the nearest year',
      SUFFIX: 'Years',
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS.EMPLOYEES_UK]: {
      HEADING: 'How many employees do you have?',
      LABEL: 'In the UK',
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS.EMPLOYEES_INTERNATIONAL]: {
      LABEL: 'Worldwide including UK',
    },
  },
  TURNOVER: {
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.TURNOVER.FINANCIAL_YEAR_END_DATE]: {
      LABEL: 'Your financial year end date',
      HINT: 'This information comes from Companies House',
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.TURNOVER.ESTIMATED_ANNUAL_TURNOVER]: {
      HEADING: 'Estimated annual turnover for this current financial year',
      LABEL: 'Estimate this to the nearest pound. Do not use decimal points.',
      PREFIX: '£',
    },
  },
};
