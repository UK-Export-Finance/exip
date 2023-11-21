import { FIELD_IDS } from '../../../../constants';

const { EXPORTER_BUSINESS } = FIELD_IDS.INSURANCE;

const {
  YOUR_COMPANY: { TRADING_ADDRESS, HAS_DIFFERENT_TRADING_NAME, PHONE_NUMBER, WEBSITE },
  ALTERNATIVE_TRADING_ADDRESS,
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK },
  TURNOVER: { FINANCIAL_YEAR_END_DATE, ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER },
  BROKER: { LEGEND, USING_BROKER, NAME, ADDRESS_LINE_1, ADDRESS_LINE_2, COUNTY, POSTCODE, TOWN, EMAIL },
} = EXPORTER_BUSINESS;

export const FIELDS = {
  COMPANY_DETAILS: {
    [HAS_DIFFERENT_TRADING_NAME]: {
      SUMMARY: {
        TITLE: 'Different trading name?',
      },
    },
    [TRADING_ADDRESS]: {
      SUMMARY: {
        TITLE: 'Different trading address?',
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
  [ALTERNATIVE_TRADING_ADDRESS]: {
    LABEL: "What's your alternative trading address?",
  },
  NATURE_OF_YOUR_BUSINESS: {
    [GOODS_OR_SERVICES]: {
      LABEL: 'Tell us about your business',
      HINT: "Give us an overview of the work you do, as well as the products or services you're getting credit insurance for.",
      SUMMARY: {
        TITLE: 'Goods or services your business supplies',
      },
    },
    [YEARS_EXPORTING]: {
      LABEL: 'How many years have you been exporting for?',
      HINT: 'Round to the nearest year',
      SUFFIX: 'Years',
      SUMMARY: {
        TITLE: 'Years exporting',
      },
    },
    [EMPLOYEES_UK]: {
      LEGEND: 'How many employees do you have in the UK?',
      SUMMARY: {
        TITLE: 'UK employees',
      },
    },
  },
  TURNOVER: {
    [FINANCIAL_YEAR_END_DATE]: {
      LABEL: 'Your financial year end date',
      HINT: 'This information comes from Companies House',
      DATE_FORMAT: 'd MMMM',
    },
    [ESTIMATED_ANNUAL_TURNOVER]: {
      LEGEND: 'Estimated annual turnover for this current financial year',
      LABEL: 'Estimate this to the nearest pound. Do not use decimal points.',
      PREFIX: '£',
      SUMMARY: {
        TITLE: 'Estimated turnover this current financial year',
      },
    },
    [PERCENTAGE_TURNOVER]: {
      LABEL: 'Percentage of turnover from exports',
      SUFFIX: '%',
      SUMMARY: {
        TITLE: 'Percentage of turnover from exports',
      },
    },
  },
  BROKER: {
    [LEGEND]: {
      LEGEND: 'Enter contact details for your broker',
    },
    [USING_BROKER]: {
      SUMMARY: {
        TITLE: 'Using a broker for this insurance?',
      },
    },
    [NAME]: {
      LABEL: 'Name of broker or company',
      SUMMARY: {
        TITLE: "Broker's name or company",
      },
    },
    [ADDRESS_LINE_1]: {
      LABEL: 'Address line 1',
      SUMMARY: {
        TITLE: "Broker's address",
      },
    },
    [ADDRESS_LINE_2]: {
      LABEL: 'Address line 2 (optional)',
    },
    [TOWN]: {
      LABEL: 'Town or city',
    },
    [COUNTY]: {
      LABEL: 'County (optional)',
    },
    [POSTCODE]: {
      LABEL: 'Postcode',
    },
    [EMAIL]: {
      LABEL: 'Email address',
      SUMMARY: {
        TITLE: "Broker's email",
      },
    },
  },
};
