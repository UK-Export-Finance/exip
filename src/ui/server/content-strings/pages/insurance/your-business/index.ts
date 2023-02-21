import { COMPANY_DETAILS } from './exporter-business';

const SHARED = {
  HEADING_CAPTION: 'Your business',
};

const EXPORTER_BUSINESS = {
  COMPANY_DETAILS: {
    ...SHARED,
    ...COMPANY_DETAILS,
  },
  NATURE_OF_YOUR_BUSINESS: {
    ...SHARED,
    PAGE_TITLE: 'Nature of your business',
  },
  TURNOVER: {
    ...SHARED,
    PAGE_TITLE: 'Turnover',
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
