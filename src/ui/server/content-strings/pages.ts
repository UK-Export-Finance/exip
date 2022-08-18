import { LINKS } from './links';

const COMPANY_BASED_PAGE = {
  PAGE_TITLE: 'Is your company based inside the UK, Channel Islands or Isle of Man?',
  HEADING: 'Is your company based inside the UK, Channel Islands or Isle of Man?',
};

const BUYER_COUNTRY_PAGE = {
  PAGE_TITLE: 'Where is your buyer based?',
  HEADING: 'Where is your buyer based?',
};

const HAS_MINIMUM_UK_GOODS_OR_SERVICES_PAGE = {
  PAGE_TITLE: 'Is at least 20% of your export contract value made up from UK goods or services?',
  HEADING: 'Is at least 20% of your export contract value made up from UK goods or services?',
  DETAILS: {
    INTRO: 'What counts as UK goods and services?',
    INCLUDES: {
      INTRO: 'UK goods and services includes:',
      PRODUCTS: 'products made in the UK',
      MANUFACTURED: 'goods manufactured outside the UK but processed or modified in the UK, which would then be eligible for a certificate of UK origin',
      STAFFING_COSTS: {
        LINK: {
          TEXT: 'staffing costs',
          HREF: '#staffing-costs',
        },
        TEXT: 'from services provided by UK companies',
      },
      NON_PHYSICAL_ASSETS: {
        LINK: {
          TEXT: 'non-physical assets',
          HREF: '#non-physical-assets',
        },
        TEXT: 'that are produced in the UK',
      },
      CAN_COUNT_AS: 'If any of the above are from the Channel Islands or Isle of Man, you can also count them as UK goods or services.',
    },
    DOES_NOT_COUNT: {
      HEADING: 'What does not count as UK goods and services',
      TEXT: "Goods or services from outside the UK that you'll send directly to the buyer unprocessed or unaltered in the UK do not count. Instead, they're classed as foreign goods and services.",
    },
    STAFFING_COSTS: {
      HEADING: 'Staffing costs for this export contract',
      TEXT: 'You can count the following (but only count the actual staffing costs incurred on this specific export contract):',
      LIST: [
        {
          TEXT: 'employees of your UK business',
        },
        {
          TEXT: 'contractors supplied to work for you by a UK sub-contractor',
        },
        {
          TEXT: "staff seconded from abroad to work for you in the UK, on the export contract, and for whom you're financially responsible",
        },
      ],
    },
    NON_PHYSICAL_ASSETS: {
      HEADING: 'Non-physical assets',
      TEXT: "Some assets cannot have a certificate of origin as they're not physical goods, for example, a licence to manufacture goods in another country. But they still count as UK goods or services if they originate from the UK.",
    },
    NOT_SURE: {
      HEADING: "If you're not sure",
      BODY_1: 'You can speak with',
      LINK: {
        TEXT: 'an export finance manager',
        HREF: LINKS.EXTERNAL.EXPORT_FINANCE_MANAGERS,
      },
      BODY_2: "if you'd like to check whether you're eligible around this criteria.",
      BODY_3: "We'll also calculate this thoroughly if you go on to make a full application.",
    },
  },
};

const POLICY_TYPE_PAGE = {
  PAGE_TITLE: 'What kind of policy do you need?',
  HEADING: 'What kind of policy do you need?',
};

const TELL_US_ABOUT_YOUR_POLICY_PAGE = {
  SINGLE_POLICY_PAGE_TITLE: 'Tell us about the single contract policy you need',
  SINGLE_POLICY_HEADING: 'Tell us about the single contract policy you need',
  MULTI_POLICY_PAGE_TITLE: 'Tell us about the multiple contract policy you need',
  MULTI_POLICY_HEADING: 'Tell us about the multiple contract policy you need',
};

const CHECK_YOUR_ANSWERS_PAGE = {
  PAGE_TITLE: 'Check your answers',
  HEADING: 'Check your answers',
  GROUP_HEADING_EXPORT: 'Export details',
  GROUP_HEADING_POLICY: 'Policy details',
  SUBMIT_BUTTON: 'Get your quote',
};

const CANNOT_OBTAIN_COVER_PAGE = {
  PAGE_TITLE: 'You cannot apply for UKEF export insurance',
  HEADING: 'You cannot apply for UKEF export insurance',
  REASON: {
    INTRO: 'This is because',
    UNSUPPORTED_COMPANY_COUNTRY: 'your company is not based in the UK, Channel Islands or Isle of Man.',
    UNSUPPORTED_BUYER_COUNTRY_1: 'your buyer is based in',
    UNSUPPORTED_BUYER_COUNTRY_2: 'which we cannot provide cover for.',
    NOT_ENOUGH_HAS_MINIMUM_UK_GOODS_OR_SERVICES: 'your export contract value is not made up from  at least 20% UK goods or services.',
  },
  ACTIONS: {
    INTRO: 'You can:',
    ELIGIBILITY: {
      TEXT: 'read about',
      LINK: {
        TEXT: 'eligibility',
        HREF: `${LINKS.EXTERNAL.GUIDANCE}#eligibility`,
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

const YOUR_QUOTE_PAGE = {
  PAGE_TITLE: 'You can apply for UKEF export insurance',
  QUOTE: {
    HEADING: 'You can apply for UKEF export insurance',
    SUB_HEADING: 'Your quote',
  },
  NOTICE_1: 'This quote is not binding and does not commit UKEF to providing cover.',
  NOTICE_2: 'You need to make a full application to UKEF to confirm your eligibility and price.',
  NOTICE_3: 'Your price may be higher if our underwriters find additional risks with your export or buyer.',
  WHAT_HAPPENS_NEXT: {
    HEADING: 'What happens next?',
    INTRO: [
      [
        {
          text: 'You can now submit a',
        },
        {
          text: 'full application',
          href: '#',
        },
        {
          text: '. ',
        },
        {
          text: 'It takes about 2 weeks to get a decision from UKEF.',
        },
      ],
      [
        {
          text: 'You can get help with the application process from export finance managers or brokers.',
        },
      ],
    ],
    EXPORT_FINANCE_MANAGERS: {
      HEADING: 'Export finance managers',
      ITEMS: [
        [
          {
            text: 'They work for UKEF and are available in every region. They can give you free guidance when making a full application. Find your',
          },
          {
            text: 'nearest export finance manager',
            href: LINKS.EXTERNAL.EXPORT_FINANCE_MANAGERS,
          },
          {
            text: '.',
          },
        ],
      ],
    },
    BROKERS: {
      HEADING: 'Brokers',
      ITEMS: [
        [
          {
            text: 'They act as an agent between you and UKEF. They can also help you with the application process.',
          },
        ],
        [
          {
            text: 'They receive a 15% fee for providing any successful policies at no extra cost to you. UKEF will pay their fee out of the policy premium you pay.',
          },
          {
            text: 'Use our approved broker list',
            href: LINKS.EXTERNAL.APPROVED_BROKER_LIST,
          },
          {
            text: ' to find a broker to help you.',
          },
        ],
      ],
    },
  },
};

const COOKIES_PAGE = {
  PAGE_TITLE: 'Cookies',
  HEADING: 'Cookies',
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
};

const NEED_TO_START_AGAIN = {
  PAGE_TITLE: 'You need to start again',
  HEADING: 'You need to start again',
  REASON: 'This is because you have not yet answered all the eligibility questions.',
};

const PAGE_NOT_FOUND_PAGE = {
  PAGE_TITLE: 'Page not found',
  HEADING: 'Page not found',
  BODY_1: 'If you typed the web address, check it is correct.',
  BODY_2: 'If you pasted the web address, check you copied the entire address.',
};

const PROBLEM_WITH_SERVICE_PAGE = {
  PAGE_TITLE: 'Problem with the service',
  HEADING: 'Sorry, there is a problem with the service',
};

export const PAGES = {
  COMPANY_BASED_PAGE,
  BUYER_COUNTRY_PAGE,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES_PAGE,
  POLICY_TYPE_PAGE,
  TELL_US_ABOUT_YOUR_POLICY_PAGE,
  CHECK_YOUR_ANSWERS_PAGE,
  CANNOT_OBTAIN_COVER_PAGE,
  YOUR_QUOTE_PAGE,
  COOKIES_PAGE,
  NEED_TO_START_AGAIN,
  PAGE_NOT_FOUND_PAGE,
  PROBLEM_WITH_SERVICE_PAGE,
};
