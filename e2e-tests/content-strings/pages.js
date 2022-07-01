const PRODUCT = require('./product');
const LINKS = require('./links');

const BEFORE_YOU_START = {
  PAGE_TITLE: PRODUCT.DESCRIPTION,
  HEADING: PRODUCT.DESCRIPTION,
  INTRO_1: 'If you\'re an exporter and having problems getting export insurance, you may be able to get cover from UK Export Finance (UKEF).',
  INTRO_2: 'This is sometimes known as credit insurance.',
  USE_SERVICE_TO: {
    INTRO: 'Use this service to',
    LIST: [
      {
        text: 'get a non-binding quote to cover a single buyer for up to 9 months',
      },
      {
        text: 'check if your buyer country is covered',
      },
      {
        text: 'complete a basic eligibility check',
      },
    ],
  },
  YOU_WILL_NEED: 'You`ll need to get a separate quote for each buyer you want to export to.',
  COMPLETION_TIME: 'It takes around 5 minutes.',
  MORE_THAN_MAX_PERIOD: {
    INTRO: 'If you need cover for more than 9 months,',
    LINK: {
      TEXT: 'fill in this form',
      HREF: LINKS.EXTERNAL.NBI_FORM,
    },
    OUTRO: 'instead',
  },
  SUBMIT_BUTTON: 'Start now',
};

const COMPANY_BASED_PAGE = {
  PAGE_TITLE: 'Is your company based inside the UK, Channel Islands and Isle of Man?',
  HEADING: 'Is your company based inside the UK, Channel Islands and Isle of Man?',
};

const BUYER_BASED_PAGE = {
  PAGE_TITLE: 'In which country is your buyer based?',
  HEADING: 'In which country is your buyer based?',
};

const TRIED_TO_OBTAIN_COVER_PAGE = {
  PAGE_TITLE: 'Are you able to get insurance for this export from companies in the private sector?',
  HEADING: 'Are you able to get insurance for this export from companies in the private sector?',
};

const UK_CONTENT_PERCENTAGE_PAGE = {
  PAGE_TITLE: 'Is at least 20% of your export contract value made up from UK goods or services?',
  HEADING: 'Is at least 20% of your export contract value made up from UK goods or services?',
  DETAILS: {
    INTRO: 'I\'m not sure',
    ITEMS: [
      [
        {
          text: 'Your export must be made up of at least 20% UK goods or services to be eligible for UKEF export insurance.',
        },
      ],
      [
        {
          text: 'You can get help with this question from one of our',
        },
        {
          text: 'Export Finance Managers',
          href: '#',
        },
        {
          text: 'if you want to work out if you\'re eligible or not.',
        },
      ],
      [
        {
          text: 'We\'ll also calculate this amount exactly with you later if you decide to go ahead and make a full application.',
        },
      ],
    ],
  },
};

const TELL_US_ABOUT_YOUR_DEAL_PAGE = {
  PAGE_TITLE: 'Tell us about your deal',
  HEADING: 'Tell us about your deal',
  DESCRIPTION: 'To give you a quote, we need some more information.',
};

const CHECK_YOUR_ANSWERS_PAGE = {
  PAGE_TITLE: 'Check your answers before you submit',
  HEADING: 'Check your answers before you submit',
  GROUP_HEADING_COMPANY: 'Company details',
  GROUP_HEADING_EXPORT: 'Export details',
  GROUP_HEADING_DEAL: 'Deal details',
};

const CANNOT_OBTAIN_COVER_PAGE = {
  PAGE_TITLE: 'You cannot apply for UKEF export insurance',
  HEADING: 'You cannot apply for UKEF export insurance',
  REASON: {
    INTRO: 'This is because',
    UNSUPPORTED_COMPANY_COUNTRY: 'your company is not based in the UK, Channel Islands or Isle of Man',
    UNSUPPORTED_BUYER_COUNTRY_1: 'your buyer is based in',
    UNSUPPORTED_BUYER_COUNTRY_2: 'which we cannot provide cover for.',
    CAN_GET_PRIVATE_INSURANCE: 'you\'re able to get insurance for this export from companies in the private sector.',
    HAVE_NOT_TRIED_PRIVATE_INSURANCE: 'you\'ve not yet tried to get this from private insurers.',
    NOT_ENOUGH_UK_GOODS_OR_SERVICES: 'your export does not contain enough UK goods or services.',
  },
  ACTIONS: {
    INTRO: 'You can:',
    ELIGIBILITY: {
      TEXT: 'read about',
      LINK: {
        TEXT: 'eligibility',
        HREF: '#',
      },
    },
    CONTACT_APPROVED_BROKER: {
      LINK: {
        TEXT: 'contact an approved broker',
        HREF: '#',
      },
      TEXT: 'who may be able to help you get insurance from the private sector, if you`ve not tried already',
    },
  },
};

const YOUR_QUOTE_PAGE = {
  PAGE_TITLE: 'You can apply for UKEF export insurance',
  DESCRIPTION: 'To give you a quote, we need some more information.',
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
          text: '.',
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
            text: 'They work for UKEF and are available in every region.They can give you free guidance when making a full application. Find your nearest',
          },
          {
            text: 'export finance manager',
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
            text: 'They act as an agent between you and UKEF.  They can also help you with the application process.',
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
            text: 'to find a broker to help you.',
          },
        ],
      ],
    },
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

module.exports = {
  BEFORE_YOU_START,
  COMPANY_BASED_PAGE,
  BUYER_BASED_PAGE,
  TRIED_TO_OBTAIN_COVER_PAGE,
  UK_CONTENT_PERCENTAGE_PAGE,
  TELL_US_ABOUT_YOUR_DEAL_PAGE,
  CHECK_YOUR_ANSWERS_PAGE,
  CANNOT_OBTAIN_COVER_PAGE,
  YOUR_QUOTE_PAGE,
  PAGE_NOT_FOUND_PAGE,
  PROBLEM_WITH_SERVICE_PAGE,
};
