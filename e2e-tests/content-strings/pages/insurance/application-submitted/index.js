import { CONTACT_DETAILS, ROUTES } from '../../../../constants';
import { LINKS } from '../../../links';

const APPLICATION_SUBMITTED = {
  PAGE_TITLE: 'Application submitted',
  YOUR_REFERENCE: 'Your reference',
  WHAT_HAPPENS_NEXT: {
    HEADING: 'What happens next?',
    INTRO: "We've emailed you a receipt of your application.",
    WILL_SEND_EMAIL: "Next, we'll send you an email requesting your anti- bribery code of conduct and your trading history with the buyer.",
    MAY_ALSO_CONTACT: 'We may also contact you with extra questions if we need to assess the environmental impact of your exports.',
  },
  DECISION_FROM_US: {
    HEADING: "When you'll get a decision from us",
    TIMEFRAME: "You'll usually get a decision within 7 working days. If we need any more information from you, it may take 2 to 3 weeks.",
    HAVE_ANY_QUESTIONS: {
      INTRO: 'If you have any questions about your application, email',
      LINK: {
        TEXT: CONTACT_DETAILS.EMAIL.UNDERWRITING,
        HREF: `mailto:${CONTACT_DETAILS.EMAIL.UNDERWRITING}`,
      }
    },
  },
  HELP_US_IMPROVE: {
    HEADING: 'Help us improve this service',
    CARRY_OUT: 'We regularly carry out research to improve our services. You can',
    TAKE_PART: {
      TEXT: 'take part',
      HREF: LINKS.EXTERNAL.RESEARCH,
    },
    IF_YOU_LIKE: "if you'd like to be involved.",
    FEEDBACK: {
      INTRO: 'You can also',
      LINK: {
        TEXT: LINKS.GIVE_FEEDBACK,
        HREF: ROUTES.INSURANCE.FEEDBACK,
      },
    },
  },
};

export default APPLICATION_SUBMITTED;
