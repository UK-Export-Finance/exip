import { MAXIMUM_CHARACTERS } from '../../../../constants';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { SYMBOLS } from '../../../../constants/supported-currencies';
import { FORM_TITLES } from '../../../form-titles';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { TRADING_ADDRESS, HAS_DIFFERENT_TRADING_NAME, DIFFERENT_TRADING_NAME, PHONE_NUMBER, WEBSITE },
    ALTERNATIVE_TRADING_ADDRESS: { FULL_ADDRESS },
    NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK },
    TURNOVER: { FINANCIAL_YEAR_END_DATE, ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER },
    HAS_CREDIT_CONTROL,
  },
  CURRENCY: { CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

const {
  YOUR_BUSINESS: { COMPANY_DETAILS, NATURE_OF_BUSINESS, TURNOVER, CREDIT_CONTROL },
} = FORM_TITLES;

export const FIELDS = {
  COMPANY_DETAILS: {
    [HAS_DIFFERENT_TRADING_NAME]: {
      SUMMARY: {
        TITLE: 'Different trading name',
        FORM_TITLE: COMPANY_DETAILS,
      },
    },
    [DIFFERENT_TRADING_NAME]: {
      SUMMARY: {
        FORM_TITLE: COMPANY_DETAILS,
      },
    },
    [TRADING_ADDRESS]: {
      SUMMARY: {
        TITLE: 'Different trading address',
        FORM_TITLE: COMPANY_DETAILS,
      },
      MAXIMUM: MAXIMUM_CHARACTERS.FULL_ADDRESS,
    },
    [WEBSITE]: {
      SUMMARY: {
        TITLE: 'Company website (optional)',
        FORM_TITLE: COMPANY_DETAILS,
      },
    },
    [PHONE_NUMBER]: {
      SUMMARY: {
        TITLE: 'UK telephone number (optional)',
        FORM_TITLE: COMPANY_DETAILS,
      },
    },
  },
  [FULL_ADDRESS]: {
    LABEL: "What's your alternative trading address?",
    REGISTERED_OFFICE_ADDRESS_HEADING: 'Your registered office address',
    REGISTERED_OFFICE_ADDRESS_HINT: 'This information comes from Companies House.',
    SUMMARY: {
      TITLE: 'Different trading address',
      FORM_TITLE: COMPANY_DETAILS,
    },
    MAXIMUM: MAXIMUM_CHARACTERS.FULL_ADDRESS,
  },
  NATURE_OF_YOUR_BUSINESS: {
    [GOODS_OR_SERVICES]: {
      LABEL: 'Tell us about your business',
      HINT: "Give us an overview of the work you do, as well as the products or services you're getting credit insurance for.",
      MAXIMUM: MAXIMUM_CHARACTERS.BUSINESS.GOODS_OR_SERVICES_DESCRIPTION,
      SUMMARY: {
        TITLE: 'Goods or services your business supplies',
        FORM_TITLE: NATURE_OF_BUSINESS,
      },
    },
    [YEARS_EXPORTING]: {
      LABEL: 'How many years have you been exporting for?',
      HINT: 'Round to the nearest year',
      SUFFIX: 'Years',
      SUMMARY: {
        TITLE: 'Years exporting',
        FORM_TITLE: NATURE_OF_BUSINESS,
      },
    },
    [EMPLOYEES_UK]: {
      LEGEND: 'How many employees do you have in the UK?',
      SUMMARY: {
        TITLE: 'Number of UK employees',
        FORM_TITLE: NATURE_OF_BUSINESS,
      },
    },
  },
  TURNOVER: {
    [FINANCIAL_YEAR_END_DATE]: {
      LABEL: 'Your financial year end date',
      HINT: 'This information comes from Companies House',
      DATE_FORMAT: 'd MMMM',
      SUMMARY: {
        FORM_TITLE: NATURE_OF_BUSINESS,
      },
    },
    [ESTIMATED_ANNUAL_TURNOVER]: {
      LEGEND: 'Estimated annual turnover for this current financial year',
      PREFIX: SYMBOLS.GBP,
      SUMMARY: {
        TITLE: 'Estimated turnover this current financial year',
        FORM_TITLE: TURNOVER,
      },
    },
    [PERCENTAGE_TURNOVER]: {
      LABEL: 'Percentage of turnover from exports',
      SUFFIX: '%',
      SUMMARY: {
        TITLE: 'Percentage of turnover from exports',
        FORM_TITLE: TURNOVER,
      },
    },
  },
  [CURRENCY_CODE]: {
    LEGEND: 'What currency is your turnover in?',
  },
  [HAS_CREDIT_CONTROL]: {
    HINT: 'These are often called credit control processes. They may be managed by your legal or financial team.',
    SUMMARY: {
      TITLE: 'Process for managing late payments',
      FORM_TITLE: CREDIT_CONTROL,
    },
  },
};
