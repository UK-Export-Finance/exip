import POLICY_AND_EXPORTS from './policy-and-exports';
import * as ELIGIBILITY_PAGES from './eligibility';
import * as EXPORTER_BUSINESS from './exporter-business';

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
  BODY_3: "You'll usually get a decision back from UKEF within 2 weeks. This is because underwriters need to carry out checks on risks around the buyer.",
  BODY_4: 'If you need it more urgently, you can tell us before you submit your application.',
};

const ALL_SECTIONS = {
  PAGE_TITLE: 'Apply for UKEF export insurance',
};

const INSURANCE = {
  START,
  EXPORTER_BUSINESS,
  ELIGIBILITY: ELIGIBILITY_PAGES,
  ALL_SECTIONS,
  POLICY_AND_EXPORTS,
};

export default INSURANCE;
