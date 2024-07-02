import { ROUTES, CONTACT_DETAILS } from '../../../constants';
import { LINKS } from '../../links';
import { BUTTONS } from '../../buttons';
import ELIGIBILITY_CONTENT_STRINGS from './eligibility';
import ACCOUNT from './account';
import POLICY from './policy';
import EXPORTER_BUSINESS from './your-business';
import YOUR_BUYER from './your-buyer';
import EXPORT_CONTRACT from './export-contract';
import DECLARATIONS from './declarations';
import CHECK_YOUR_ANSWERS from './check-your-answers';
import COMPLETE_OTHER_SECTIONS from './complete-other-sections';
import APPLICATION_SUBMITTED from './application-submitted';

const DASHBOARD = {
  PAGE_TITLE: 'Your applications',
  TABLE_HEADERS: {
    STATUS: 'Status',
    BUYER_LOCATION: 'Buyer location',
    BUYER_NAME: 'Buyer name',
    VALUE: 'Value',
    REFERENCE_NUMBER: 'Reference number',
    SUBMITTED: 'Submitted',
  },
  NO_APPLICATIONS: 'You have no applications currently.',
  START_NEW_APPLICATION: {
    TEXT: BUTTONS.START_A_NEW_APPLICATION,
    HREF: ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION,
  },
  GET_A_QUOTE: {
    TEXT: BUTTONS.GET_A_QUOTE_FOR_INSURANCE,
    HREF: ROUTES.QUOTE.START,
  },
};

const ALL_SECTIONS = {
  PAGE_TITLE: 'Apply for UKEF credit insurance',
  DEADLINE_TO_SUBMIT: 'Deadline to submit',
  REFERENCE_NUMBER: 'Your reference',
};

const START = {
  PAGE_TITLE: 'Apply for UKEF credit insurance',
  INTRO: 'Use this service to make a full application for credit insurance from UK Export Finance (UKEF).',
  LIST: {
    INTRO: "You'll need your:",
    ITEMS: [
      'company details and finances',
      "buyer's details",
      "trading history with the buyer, if you've worked together before",
      'code of conduct, if you have one',
    ],
  },
  BODY_1: "Depending on your export contract, you may also need your buyer's annual report and accounts.",
  BODY_2: 'You do not need to complete all answers in one session.',
  BODY_3: "You'll usually get a decision back within 7 working days, if we do not need to ask you any further questions.",
  BODY_4: 'If we need to gather extra information, it may take around 2 to 3 weeks.',
  SIGN_IN: {
    YOU_CAN: 'You can',
    LINK: {
      TEXT: 'sign in to your account',
      HREF: ROUTES.INSURANCE.ACCOUNT.SIGN_IN.ROOT,
    },
    TO_CONTINUE_APPLICATION: "to continue an application, if you've already started one.",
  },
  FIND_OUT_MORE: {
    YOU_CAN: 'You can',
    LINK: {
      TEXT: 'find out more about UKEF credit insurance',
      HREF: LINKS.EXTERNAL.GUIDANCE,
    },
    TO_FIND_OUT_MORE: "if you want to know who's eligible and what's covered.",
  },
  EXTRA_SUPPORT: {
    INTRO: "Export finance managers can help if you'd like extra support with your application or have questions about credit insurance.",
    LINK: {
      TEXT: 'Find your nearest export finance manager.',
      HREF: LINKS.EXTERNAL.EXPORT_FINANCE_MANAGERS,
    },
  },
  QUOTE: {
    YOU_CAN: 'You can also',
    LINK: {
      TEXT: 'get an instant quote',
      HREF: ROUTES.QUOTE.START,
    },
    IF_YOU_NEED: 'if you need one',
  },
};

const NO_ACCESS_TO_APPLICATION_PAGE = {
  PAGE_TITLE: "You don't have access to this application",
  CHECK_URL: "Please check the URL you've entered.",
};

const NO_ACCESS_APPLICATION_SUBMITTED_PAGE = {
  PAGE_TITLE: 'This application has been submitted to UKEF',
  PROCESSING: 'We are currently processing your application.',
  CONTACT_FURTHER_INFORMATION: 'We will contact you if any further information is required, and when a decision has been made.',
  WITHDRAW:
    'If you would like to withdraw your application or have any other queries, please contact our underwriting team quoting your application reference number:',
  CONTACT: CONTACT_DETAILS.EMAIL.UNDERWRITING,
};

export default {
  START,
  ACCOUNT,
  DASHBOARD,
  ALL_SECTIONS,
  EXPORTER_BUSINESS,
  ELIGIBILITY: ELIGIBILITY_CONTENT_STRINGS,
  NO_ACCESS_TO_APPLICATION_PAGE,
  POLICY,
  YOUR_BUYER,
  EXPORT_CONTRACT,
  DECLARATIONS,
  CHECK_YOUR_ANSWERS,
  COMPLETE_OTHER_SECTIONS,
  APPLICATION_SUBMITTED,
  NO_ACCESS_APPLICATION_SUBMITTED_PAGE,
};
