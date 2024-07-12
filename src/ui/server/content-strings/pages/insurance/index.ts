import { ROUTES, UKEF_CONTACT_DETAILS } from '../../../constants';
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
  CONTACT: UKEF_CONTACT_DETAILS.EMAIL.UNDERWRITING,
};

export default {
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
