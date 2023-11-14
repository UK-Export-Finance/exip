import { ELIGIBILITY, ROUTES, CONTACT_DETAILS } from '../../../constants';
import { LINKS } from '../../links';
import { BUTTONS } from '../../buttons';
import ELIGIBILITY_CONTENT_STRINGS from './eligibility';
import ACCOUNT from './account';
import POLICY from './policy';
import EXPORTER_BUSINESS from './your-business';
import YOUR_BUYER from './your-buyer';
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
  PAGE_TITLE: 'Apply for UKEF export insurance',
  DEADLINE_TO_SUBMIT: 'Deadline to submit',
  REFERENCE_NUMBER: 'Your reference',
};

const APPLY_OFFLINE = {
  PAGE_TITLE: 'You need to apply using our form',
  REASON: {
    INTRO: 'This is because',
    OTHER_PARTIES_INVOLVED: 'there are other parties involved in your exports and we need to make extra checks.',
    WILL_BE_PAID_BY_LETTER_OF_CREDIT: "you'll be paid by a letter of credit.",
    NEED_PRE_CREDIT_PERIOD_COVER: 'you need pre-credit cover and we need to make extra checks.',
    NO_COMPANIES_HOUSE_NUMBER: "This is because you do not have a UK Companies House registration number for a company that's actively trading.",
  },
  ACTIONS: {
    DOWNLOAD_FORM: {
      LINK: {
        TEXT: 'Download this form',
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

const SPEAK_TO_UKEF_EFM = {
  PAGE_TITLE: 'You need to speak with a UKEF export finance manager',
  REASON: {
    INTRO: 'This is because',
    WANT_COVER_OVER_MAX_PERIOD: `you want to be insured for longer than ${ELIGIBILITY.MAX_COVER_PERIOD_YEARS} years.`,
  },
  ACTIONS: {
    FIND_EFM: [
      [
        {
          text: 'Find ',
        },
        {
          text: 'your nearest export finance manager',
          href: LINKS.EXTERNAL.EXPORT_FINANCE_MANAGERS,
        },
        {
          text: ' to discuss this.',
        },
      ],
    ],
  },
};

const START = {
  PAGE_TITLE: 'Apply for UKEF export insurance',
  INTRO: 'Use this service to make a full application for export insurance from UK Export Finance (UKEF).',
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
      TEXT: 'find out more about UKEF export insurance',
      HREF: LINKS.EXTERNAL.GUIDANCE,
    },
    TO_FIND_OUT_MORE: "if you want to know who's eligible and what's covered.",
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
  APPLY_OFFLINE,
  EXPORTER_BUSINESS,
  ELIGIBILITY: ELIGIBILITY_CONTENT_STRINGS,
  NO_ACCESS_TO_APPLICATION_PAGE,
  POLICY,
  SPEAK_TO_UKEF_EFM,
  YOUR_BUYER,
  DECLARATIONS,
  CHECK_YOUR_ANSWERS,
  COMPLETE_OTHER_SECTIONS,
  APPLICATION_SUBMITTED,
  NO_ACCESS_APPLICATION_SUBMITTED_PAGE,
};
