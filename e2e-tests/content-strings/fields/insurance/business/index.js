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
  ALTERNATIVE_TRADING_ADDRESS: {
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS]: {
      LABEL: "What's your alternative trading address?",
      MAXIMUM: 1000,
    },
    [FIELD_IDS.INSURANCE.COMPANIES_HOUSE.COMPANY_ADDRESS]: {
      LABEL: 'Your registered office address',
      HINT: 'This information comes from Companies House.',
    },
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
  BROKER: {
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER.LEGEND]: {
      LEGEND: 'Enter contact details for your broker',
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER.USING_BROKER]: {
      SUMMARY: {
        TITLE: 'Using a broker for this insurance?',
      },
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER.NAME]: {
      LABEL: 'Name of broker or company',
      SUMMARY: {
        TITLE: "Broker's name or company",
      },
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER.ADDRESS_LINE_1]: {
      LABEL: 'Address line 1',
      SUMMARY: {
        TITLE: "Broker's address",
      },
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER.ADDRESS_LINE_2]: {
      LABEL: 'Address line 2 (optional)',
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER.TOWN]: {
      LABEL: 'Town or city',
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER.COUNTY]: {
      LABEL: 'County (optional)',
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER.POSTCODE]: {
      LABEL: 'Postcode',
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER.EMAIL]: {
      LABEL: 'Email address',
      SUMMARY: {
        TITLE: "Broker's email",
      },
    },
    [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER.DETAILS]: {
      SUMMARY: 'Why appoint a broker?',
      LINE_1: 'A broker can advise you during the application process and lifetime of any UKEF insurance policy.',
      LINE_2: "You can find your nearest one on UKEF's list of approved brokers.",
      LINK_TEXT: "UKEF's list of approved brokers.",
      LINE_3: 'Alternatively, you can use any broker you prefer. They do not have to be approved by UKEF.',
      LINE_4: 'Appointing a broker does not change the cost to you of any UKEF credit insurance policy.',
    },
  },
};
