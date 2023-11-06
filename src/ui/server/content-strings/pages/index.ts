import INSURANCE_PAGES from './insurance';
import QUOTE_PAGES from './quote';
import { LINKS } from '../links';
import { CONTACT_DETAILS, ROUTES } from '../../constants';
import { CUSTOMER_SERVICE_CONTACT_DETAILS } from '../contact';

const BUYER_COUNTRY = {
  PAGE_TITLE: 'Where is your buyer based?',
};

const EXPORTER_LOCATION = {
  PAGE_TITLE: 'Are you exporting from a business base inside the UK, Channel Islands or Isle of Man?',
};

const UK_GOODS_OR_SERVICES = {
  PAGE_TITLE: 'Is at least 20% of your export contract value made up from UK goods or services?',
};

const CANNOT_APPLY = {
  PAGE_TITLE: 'You cannot apply for UKEF export insurance',
  REASON: {
    INTRO: 'This is because',
    UNSUPPORTED_COMPANY_COUNTRY: 'your company is not based in the UK, Channel Islands or Isle of Man.',
    UNSUPPORTED_BUYER_COUNTRY_1: 'your buyer is based in',
    UNSUPPORTED_BUYER_COUNTRY_2: 'which we cannot provide cover for.',
    NOT_ENOUGH_UK_GOODS_OR_SERVICES: 'your export contract value is not made up from at least 20% UK goods or services.',
  },
  ACTIONS: {
    INTRO: 'You can:',
    ELIGIBILITY: {
      TEXT: 'read about',
      LINK: {
        TEXT: 'eligibility',
        HREF: LINKS.EXTERNAL.GUIDANCE,
      },
    },
    CONTACT_APPROVED_BROKER: {
      LINK: {
        TEXT: 'contact an approved broker',
        HREF: LINKS.EXTERNAL.APPROVED_BROKER_LIST,
      },
      TEXT: 'who may be able to help you get insurance from the private sector, if you`ve not tried already',
    },
  },
};

const ACCESSIBILITY_STATEMENT_PAGE = {
  PAGE_TITLE: 'Apply for export insurance - accessibility statement',
  HEADING: 'Apply for export insurance - accessibility statement',
  USING_OUR_SERVICE: {
    HEADING: 'Using our service',
    INTRO: 'This service is run by UK Export Finance. We want as many people as possible to use this service. For example, that means you should be able to:',
    LIST: [
      'change colours, contrast levels and fonts',
      'zoom in up to 300 % without the text spilling off the screen',
      'navigate most of the website using just a keyboard',
      'navigate most of the website using speech recognition software',
      'listen to most of the website using a screen reader (including the most recent versions of JAWS, NVDA and VoiceOver)',
    ],
    OUTRO: {
      WEBSITE_TEXT: "We've also made the website text as simple as possible to understand.",
      ABILITY_NET: {
        LINK: {
          TEXT: 'AbilityNet',
          HREF: LINKS.EXTERNAL.ABILITY_NET,
        },
        DESCRIPTION: 'has advice on making your device easier to use if you have a disability.',
      },
    },
  },
  COMPLIANCE_STATUS: {
    HEADING: 'Compliance',
    INTRO: 'This service is partially compliant with the',
    GUIDLINES_LINK: {
      TEXT: 'Web Content Accessibility Guidelines version 2.1',
      HREF: LINKS.EXTERNAL.ACCESSIBILITY_GUIDLINES,
    },
    OUTRO: 'AA standard due to the non-compliances listed below.',
    LIST: [
      'Focus order.',
      "Once a user has selected 'skipped to main content' on a page, for subsequent pages viewed on this website, the focus order will also skip to the main content as opposed to starting at the top of the page. This should not stop users completing the service, however it may be confusing at points.",
      'PDF form.',
      'In some instances, users will be directed to complete a PDF form to continue their application. Some PDFs do not meet accessibility standards: for example, they may not be marked up to make them accessible to a screen reader.',
    ],
  },
  IMPROVING_ACCESSIBILITY: {
    HEADING: "What we're doing to improve accessibility",
    DESCRIPTION:
      'UK Export Finance is committed to address any issues with the service. The team responsible for the service regularly tests and monitors the accessibility of the service.',
    OUTRO:
      'We will address the non-compliant points with future development work, including removing as far as possible any need to complete the PDF version of the application.',
  },
  FEEDBACK_AND_CONTACT: {
    HEADING: 'Feedback and contact information',
    INTRO: 'If you need information on this website in a different format like accessible PDF, large print, easy read, contact us:',
    LIST: ['customer.service@ukexportfinance.gov.uk', '+44(0)207 271 8010'],
    OUTRO: "We'll consider your request and get back to you in 2 days.",
  },
  REPORTING_PROBLEMS: {
    HEADING: 'Reporting accessibility problems with this website',
    DESCRIPTION:
      "We're always looking to improve the accessibility of this website. If you find any additional problems not listed above or think we're not meeting accessibility requirements, contact: customer.service@ukexportfinance.gov.uk.",
  },
  ENFORCEMENT_PROCEDURE: {
    HEADING: 'Enforcement procedure',
    DESCRIPTION:
      "The Equality and Human Rights Commission (EHRC) is responsible for enforcing the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 (the'accessibility regulations'). If you're not happy with how we respond to your complaint,",
    CONTACT: {
      TEXT: 'contact the Equality Advisory and Support Service (EASS)',
      HREF: LINKS.EXTERNAL.EQUALITY_ADVISORY_SERVICE,
    },
  },
  TECHNICAL_INFO: {
    HEADING: "Technical information about this website's accessibility",
    DESCRIPTION:
      'UK Export Finance is committed to making its website accessible, in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.',
  },
  PREPERATION_OF_STATEMENT: {
    HEADING: 'Preparation of this accessibility statement',
    LIST: [
      'This statement was prepared 1st November 2023. It was last reviewed on 1st November 2023.',
      'This website was last tested on 28th June 2023. The test was carried out by UK Export Finance and Digital Accessibility Centre (DAC).',
    ],
  },
};

const COOKIES_PAGE = {
  PAGE_TITLE: 'Cookies',
  BODY_1: "UK Export Finance (UKEF) puts small files (known as 'cookies') onto your computer to make this site work.",
  BODY_2: "Our cookies aren't used to identify you personally.",
  TABLE_HEADINGS: {
    NAME: 'Name',
    PURPOSE: 'Purpose',
    EXPIRES: 'Expires',
  },
  ESSENTIAL_COOKIES: {
    HEADING: 'Essential Cookies',
    INTRO: 'Essential cookies keep your information secure while you use this service. We do not need to ask permission to use them.',
    ITEMS: [
      {
        NAME: 'Security',
        PURPOSE: 'This is an essential security cookie, which authenticates your requests with our service.',
        EXPIRES: '12 hours',
      },
      {
        NAME: 'Session',
        PURPOSE: 'This is an essential session cookie, necessary for basic web application operation.',
        EXPIRES: '7 days',
      },
    ],
  },
  OPTIONAL_COOKIES: {
    HEADING: 'Optional Cookies',
    BODY_1:
      'With your permission, we use Google Analytics to collect how you use this service and your web performance experience while visiting so we can improve it based on user needs.',
    BODY_2: 'We do not allow Google to use or share the data about how you use this service.',
    BODY_3: 'Google Analytics stores anonymised information about:',
    ANALYTICS_INFO_LIST: [
      {
        text: 'how you got to this service',
      },
      {
        text: 'the pages you visit on GOV.UK and government digital services, and how long you spend on each page',
      },
      {
        text: "what you click on while you're visiting the site",
      },
    ],
  },
};

const COOKIES_SAVED_PAGE = {
  PAGE_TITLE: 'Your cookie preferences have been saved',
  BODY: 'You can change your preferences at any time.',
};

const NEED_TO_START_AGAIN_PAGE = {
  PAGE_TITLE: 'You need to start again',
  REASON: 'This is because you have not yet answered all the eligibility questions.',
};

const PAGE_NOT_FOUND_PAGE = {
  PAGE_TITLE: 'Page not found',
  TYPED_ADDRESS: 'If you typed the web address, check it is correct.',
  PASTED_ADDRESS: 'If you pasted the web address, check you copied the entire address.',
  CONTACT: {
    TEXT: 'If the web address is correct or you selected a link or button, you can',
    LINK: {
      TEXT: 'contact us',
      QUOTE_HREF: ROUTES.CONTACT_US,
      INSURANCE_HREF: ROUTES.INSURANCE.CONTACT_US,
    },
    OUTRO: 'if you still need help.',
  },
};

const PROBLEM_WITH_SERVICE_PAGE = {
  PAGE_TITLE: 'Problem with the service',
};

const CONTACT_US_PAGE = {
  PAGE_TITLE: 'Contact us',
  WHO_TO_CONTACT: 'Who you need to contact depends on your type of query.',
  GENERAL_ENQUIRIES: {
    HEADING: 'General enquiries or questions about UK Export Finance products',
    ...CUSTOMER_SERVICE_CONTACT_DETAILS,
  },
  APPLICATION_ENQUIRES: {
    HEADING: "If you have a question about an application you've submitted",
    EMAIL: {
      PREFIX: 'Email: ',
      VALUE: CONTACT_DETAILS.EMAIL.UNDERWRITING,
    },
    QUOTE: 'Quote your application reference number',
  },
};

const FEEDBACK_PAGE = {
  PAGE_TITLE: 'Give feedback on this service',
};

const FEEDBACK_SENT_PAGE = {
  PAGE_TITLE: 'Thank you for providing feedback',
  FEEDBACK_TEXT: 'Feedback helps us improve the service and understand the user experience.',
};

export const PAGES = {
  BUYER_COUNTRY,
  EXPORTER_LOCATION,
  UK_GOODS_OR_SERVICES,
  CANNOT_APPLY,
  COOKIES_PAGE,
  COOKIES_SAVED_PAGE,
  ACCESSIBILITY_STATEMENT_PAGE,
  NEED_TO_START_AGAIN_PAGE,
  PAGE_NOT_FOUND_PAGE,
  PROBLEM_WITH_SERVICE_PAGE,
  CONTACT_US_PAGE,
  FEEDBACK_PAGE,
  FEEDBACK_SENT_PAGE,
  QUOTE: QUOTE_PAGES,
  INSURANCE: INSURANCE_PAGES,
};
