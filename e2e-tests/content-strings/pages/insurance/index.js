import { LINKS } from '../../links';
import { BUTTONS } from '../../buttons';
import { ROUTES, CONTACT_DETAILS } from '../../../constants';
import POLICY from './policy';
import * as ELIGIBILITY_PAGES from './eligibility';
import * as ACCOUNT_PAGES from './account';
import * as EXPORTER_BUSINESS from './business';
import * as YOUR_BUYER from './your-buyer';
import * as EXPORT_CONTRACT from './export-contract';
import * as DECLARATIONS from './declarations';
import * as CHECK_YOUR_ANSWERS from './check-your-answers';
import COMPLETE_OTHER_SECTIONS from './complete-other-sections';
import * as APPLICATION_SUBMITTED from './application-submitted';

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

const APPLY_OFFLINE = {
  PAGE_TITLE: 'You need to apply using our form',
  REASON: {
    INTRO: 'This is because',
    OTHER_PARTIES_INVOLVED: 'there are other parties involved in your exports and we need to make extra checks.',
    WILL_BE_PAID_BY_LETTER_OF_CREDIT: "you'll be paid by a letter of credit.",
    NO_COMPANIES_HOUSE_NUMBER: "you do not have a UK Companies House registration number for a company that's actively trading, so we need to make extra checks.",
  },
  ACTIONS: {
    DOWNLOAD_FORM: {
      LINK: {
        TEXT: 'Download this form',
        HREF_NBI: LINKS.EXTERNAL.NBI_FORM,
        HREF_PROPOSAL: LINKS.EXTERNAL.PROPOSAL_FORM,
      },
      TEXT: "and email it to UKEF once you've filled it in.",
    },
    CONTACT: {
      TEXT: "If you'd like to discuss your exports or need help applying, you can",
      LINK: {
        TEXT: 'talk to your nearest export finance manager.',
        HREF: LINKS.EXTERNAL.EXPORT_FINANCE_MANAGERS,
      },
    },
  },
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

const INSURANCE = {
  START,
  ACCOUNT: ACCOUNT_PAGES,
  DASHBOARD,
  ALL_SECTIONS,
  APPLY_OFFLINE,
  EXPORTER_BUSINESS,
  ELIGIBILITY: ELIGIBILITY_PAGES,
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

export default INSURANCE;
