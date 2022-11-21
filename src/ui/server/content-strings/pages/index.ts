import INSURANCE_PAGES from './insurance';
import QUOTE_PAGES from './quote';
import { LINKS } from '../links';

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
  SUCCESS_BANNER: {
    HEADING: 'Your cookie settings were saved',
    BODY: 'Government services may set additional cookies and, if so, will have their own cookie policy and banner.',
    GO_BACK: 'Go back to the page you were looking at',
  },
};

const NEED_TO_START_AGAIN_PAGE = {
  PAGE_TITLE: 'You need to start again',
  REASON: 'This is because you have not yet answered all the eligibility questions.',
};

const PAGE_NOT_FOUND_PAGE = {
  PAGE_TITLE: 'Page not found',
  BODY_1: 'If you typed the web address, check it is correct.',
  BODY_2: 'If you pasted the web address, check you copied the entire address.',
};

const PROBLEM_WITH_SERVICE_PAGE = {
  PAGE_TITLE: 'Problem with the service',
};

export const PAGES = {
  BUYER_COUNTRY,
  EXPORTER_LOCATION,
  UK_GOODS_OR_SERVICES,
  CANNOT_APPLY,
  COOKIES_PAGE,
  NEED_TO_START_AGAIN_PAGE,
  PAGE_NOT_FOUND_PAGE,
  PROBLEM_WITH_SERVICE_PAGE,
  QUOTE: QUOTE_PAGES,
  INSURANCE: INSURANCE_PAGES,
};
