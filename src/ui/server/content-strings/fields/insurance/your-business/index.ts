import { FIELD_IDS } from '../../../../constants';

const { EXPORTER_BUSINESS } = FIELD_IDS.INSURANCE;
const {
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK, EMPLOYEES_INTERNATIONAL },
  TURNOVER: { FINANCIAL_YEAR_END_DATE },
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
    },
  },
};
