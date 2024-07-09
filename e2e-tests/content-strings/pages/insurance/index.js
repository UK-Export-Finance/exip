import { ROUTES, CONTACT_DETAILS } from '../../../constants';
import { BUTTONS } from '../../buttons';
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
  ACCOUNT: ACCOUNT_PAGES,
  DASHBOARD,
  ALL_SECTIONS,
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
