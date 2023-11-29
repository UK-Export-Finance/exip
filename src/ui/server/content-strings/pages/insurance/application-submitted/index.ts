import { ROUTES } from '../../../../constants';
import { BUTTONS } from '../../../buttons';
import { LINKS } from '../../../links';

const APPLICATION_SUBMITTED = {
  PAGE_TITLE: 'Application submitted',
  YOUR_REFERENCE: 'Your reference',
  INTRO: "We've emailed you a receipt of your application.",
  WHAT_HAPPENS_NEXT: {
    HEADING: 'What happens next?',
    WILL_CONTACT_YOU: {
      INTRO: "We'll contact you by email shortly if you told us you have:",
      LIST: ['an anti-bribery code of conduct', 'a trading history with the buyer'],
    },
    CLIMATE_CHANGE_FACTORS:
      'We also take climate change factors into account before deciding if we can offer credit insurance for your business. We may contact you with extra questions if we need to assess the environmental impact of your exports.',
  },
  DECISION_FROM_US: {
    HEADING: "When you'll get a decision from us",
    TIMEFRAME: "You'll usually get a decision back within 7 working days, if we do not need to ask you any further questions.",
    EXTRA_INFO: 'If we need to gather extra information, it may take 2 to 3 weeks.',
  },
  ACTIONS: {
    START_NEW_APPLICATION: {
      TEXT: BUTTONS.START_A_NEW_APPLICATION,
      HREF: ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION,
    },
    GIVE_FEEDBACK: {
      TEXT: LINKS.GIVE_FEEDBACK,
      HREF: ROUTES.INSURANCE.FEEDBACK,
    },
  },
  RESEARCH: {
    HEADING: 'Take part in research',
    CARRY_OUT: 'We regularly carry out research to improve our services. You can',
    TAKE_PART: {
      TEXT: 'take part',
      HREF: LINKS.EXTERNAL.RESEARCH,
    },
    IF_YOU_LIKE: "if you'd like to be involved.",
  },
};

export default APPLICATION_SUBMITTED;
