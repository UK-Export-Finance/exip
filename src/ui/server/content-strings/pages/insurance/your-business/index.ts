import { COMPANY_DETAILS } from './company';

const SHARED = {
  HEADING_CAPTION: 'Your business',
};

const EXPORTER_BUSINESS = {
  ROOT: {
    PAGE_TITLE: 'Tell us about your business',
    INTRO: 'In this section, we want to understand more about your business and the types of products or services you export.',
    LIST: {
      INTRO: "We'll ask you to tell us:",
      ITEMS: [
        'what your estimated annual turnover is for this year',
        'if you have any credit management processes',
        'about any other credit insurance you have in place',
      ],
    },
    OUTRO: 'It should only take a few minutes to complete.',
  },
  COMPANIES_HOUSE_NUMBER: {
    ...SHARED,
    PAGE_TITLE: 'Enter your Companies House registration number (CRN)',
    NO_COMPANIES_HOUSE_NUMBER: 'I do not have a UK Companies House registration number',
  },
  COMPANY_DETAILS: {
    ...SHARED,
    ...COMPANY_DETAILS,
  },
  ALTERNATIVE_TRADING_ADDRESS: {
    ...SHARED,
    PAGE_TITLE: 'Alternative trading address',
  },
  NATURE_OF_YOUR_BUSINESS: {
    ...SHARED,
    PAGE_TITLE: 'Nature of your business',
  },
  TURNOVER: {
    ...SHARED,
    PAGE_TITLE: 'Turnover',
    PROVIDE_ALTERNATIVE_CURRENCY: 'Use a different currency for your turnover',
  },
  TURNOVER_ALTERNATIVE_CURRENCY: {
    ...SHARED,
    PAGE_TITLE: 'What currency is your turnover in?',
  },
  CREDIT_CONTROL: {
    ...SHARED,
    PAGE_TITLE: 'Do you have a process for dealing with late payments?',
  },
  CHECK_YOUR_ANSWERS: {
    ...SHARED,
    PAGE_TITLE: 'Check your answers for this section',
  },
};

export default EXPORTER_BUSINESS;
