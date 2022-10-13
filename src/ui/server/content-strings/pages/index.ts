import INSURANCE_PAGES from './insurance';
import QUOTE_PAGES from './quote';

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
  COOKIES_PAGE,
  PAGE_NOT_FOUND_PAGE,
  PROBLEM_WITH_SERVICE_PAGE,
  QUOTE: QUOTE_PAGES,
  INSURANCE: INSURANCE_PAGES,
};
