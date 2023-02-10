import { FIELD_IDS } from '../../../../constants';

const { EXPORTER_BUSINESS } = FIELD_IDS.INSURANCE;
const {
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK, EMPLOYEES_INTERNATIONAL },
  TURNOVER: { FINANCIAL_YEAR_END_DATE, ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER },
  BROKER: { BROKER_HEADING, BROKER_NAME, BROKER_ADDRESS_LINE_1, BROKER_ADDRESS_LINE_2, BROKER_COUNTY, BROKER_POSTCODE, BROKER_TOWN, BROKER_EMAIL },
} = EXPORTER_BUSINESS;

export const FIELDS = {
  NATURE_OF_YOUR_BUSINESS: {
    [GOODS_OR_SERVICES]: {
      LABEL: 'What goods or services does your company supply?',
      HINT: 'Give a general overview rather than just the exports you want to insure',
    },
    [YEARS_EXPORTING]: {
      LABEL: 'How many years have you been exporting for?',
      HINT: 'Round to the nearest year',
      SUFFIX: 'Years',
    },
    [EMPLOYEES_UK]: {
      HEADING: 'How many employees do you have?',
      LABEL: 'In the UK',
    },
    [EMPLOYEES_INTERNATIONAL]: {
      LABEL: 'Worldwide including UK',
    },
  },
  TURNOVER: {
    [FINANCIAL_YEAR_END_DATE]: {
      LABEL: 'Your financial year end date',
      HINT: 'This information comes from Companies House',
      DATE_FORMAT: 'd MMMM',
    },
    [ESTIMATED_ANNUAL_TURNOVER]: {
      HEADING: 'Estimated annual turnover for this current financial year',
      LABEL: 'Estimate this to the nearest pound. Do not use decimal points.',
      PREFIX: '£',
    },
    [PERCENTAGE_TURNOVER]: {
      LABEL: 'Percentage of turnover from exports',
      SUFFIX: '%',
    },
  },
  BROKER: {
    [BROKER_HEADING]: {
      HEADING: 'Enter contact details for your broker',
    },
    [BROKER_NAME]: {
      LABEL: 'Name of broker or company',
    },
    [BROKER_ADDRESS_LINE_1]: {
      LABEL: 'Address line 1',
    },
    [BROKER_ADDRESS_LINE_2]: {
      LABEL: 'Address line 2 (optional)',
    },
    [BROKER_TOWN]: {
      LABEL: 'Town or city',
    },
    [BROKER_COUNTY]: {
      LABEL: 'County (optional)',
    },
    [BROKER_POSTCODE]: {
      LABEL: 'Postcode',
    },
    [BROKER_EMAIL]: {
      LABEL: 'Email address',
    },
  },
};
