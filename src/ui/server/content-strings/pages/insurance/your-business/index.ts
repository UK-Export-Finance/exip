import { COMPANY_DETAILS } from './company';

const SHARED = {
  HEADING_CAPTION: 'Your business',
};

const EXPORTER_BUSINESS = {
  COMPANIES_HOUSE_NUMBER: {
    ...SHARED,
    PAGE_TITLE: 'Enter your Companies House registration number (CRN)',
    NO_COMPANIES_HOUSE_NUMBER: 'I do not have a UK Companies House registration number',
  },
  COMPANY_DETAILS: {
    ...SHARED,
    ...COMPANY_DETAILS,
  },
  COMPANIES_HOUSE_UNAVAILABLE: {
    ...SHARED,
    PAGE_TITLE: 'You cannot search for your Companies House registration number right now',
    ERROR_REASON: 'This is due to technical issues with the Companies House search',
    TRY_AGAIN_PREFIX: 'You can',
    TRY_AGAIN: 'try again in a few minutes.',
    CONTINUE_PREFIX: 'Or you can continue filling in',
    CONTINUE_LINK: 'other sections of your application,',
    CONTINUE_SUFFIX: 'until this problem is resolved',
    INFORMATION: '(You may lose any information you entered on the previous page.)',
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
  },
  CREDIT_CONTROL: {
    ...SHARED,
    PAGE_TITLE: 'Do you have a process for dealing with late payments?',
  },
  BROKER: {
    ...SHARED,
    PAGE_TITLE: 'Are you using a broker to get this insurance?',
    SUMMARY: 'Why appoint a broker?',
    LINE_1: 'A broker can advise you during the application process and lifetime of any UKEF insurance policy.',
    LINE_2: 'You can find your nearest one on',
    LINK_TEXT: "UKEF's list of approved brokers.",
    LINE_3: 'Alternatively, you can use any broker you prefer. They do not have to be approved by UKEF.',
    LINE_4: 'Appointing a broker does not change the cost to you of any UKEF export insurance policy.',
  },
  CHECK_YOUR_ANSWERS: {
    ...SHARED,
    PAGE_TITLE: 'Check your answers for this section',
  },
};

export default EXPORTER_BUSINESS;
