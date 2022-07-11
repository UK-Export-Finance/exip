const PRODUCT = require('./product');
const LINKS = require('./links');

const BEFORE_YOU_START = {
  PAGE_TITLE: PRODUCT.DESCRIPTION,
  HEADING: PRODUCT.DESCRIPTION,
  INTRO_1: 'If you\'re an exporter and having problems getting export insurance, you may be able to get cover from UK Export Finance (UKEF).',
  INTRO_2: 'This is sometimes known as credit insurance.',
  USE_SERVICE_TO: {
    INTRO: 'Use this service to:',
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

const BUYER_COUNTRY_PAGE = {
  PAGE_TITLE: 'In which country is your buyer based?',
  HEADING: 'In which country is your buyer based?',
};

const CAN_GET_PRIVATE_INSURANCE_PAGE = {
  PAGE_TITLE: 'Are you able to get insurance for this export from companies in the private sector?',
  HEADING: 'Are you able to get insurance for this export from companies in the private sector?',
};

const UK_GOODS_OR_SERVICES_PAGE = {
  PAGE_TITLE: 'Is at least 20% of your export contract value made up from UK goods or services?',
  HEADING: 'Is at least 20% of your export contract value made up from UK goods or services?',
  DETAILS: {
    INTRO: 'What counts as UK goods and services?',
    INCLUDES: {
      INTRO: 'UK goods and services includes:',
      PRODUCTS: 'products made in the UK',
      MANUFACTURED: 'goods manufactured outside the UK but processed or modified here - they\'ll usually still have a certificate of UK origin',
      STAFFING_COSTS: {
        LINK: {
          TEXT: 'staffing costs',
          HREF: '#',
        },
        TEXT: 'from services provided by UK companies',
      },
      NON_PHYSICAL_ASSETS: {
        LINK: {
          TEXT: 'non-physical assets',
          HREF: '#',
        },
        TEXT: 'that are produced in the UK',
      },
    },
    DOES_NOT_COUNT: {
      HEADING: 'What does not count as UK goods and services',
      TEXT: 'Goods or services from outside the UK that you\'ll send directly to the buyer unprocessed or unaltered in the UK are classed as foreign goods and services.',
    },
    STAFFING_COSTS: {
      HEADING: 'Staffing costs',
      TEXT: 'You can treat the following staffing costs as UK services:',
      LIST: [
        {
          TEXT: 'employees of your UK business',
        },
        {
          TEXT: 'contractors supplied to work for you by a UK sub- contractor',
        },
        {
          TEXT: 'staff seconded from abroad to work for you in the UK, on the export contract, and for whom you’re financially responsible',
        },
      ],
    },
    NON_PHYSICAL_ASSETS: {
      HEADING: 'Non-physical assets',
      TEXT: 'Some assets cannot have a certificate of origin as they\'re not physical goods, for example, a licence to manufacture goods in another country. But they still count as UK goods or services if they originate from the UK.',
    },
    NOT_SURE: {
      HEADING: 'If you\'re not sure',
      BODY_1: 'You can speak with',
      LINK: {
        TEXT: 'an export finance manager',
        HREF: '#',
      },
      BODY_2: 'if you\'d like to check whether you\'re eligible around this criteria.',
      BODY_3: 'We\'ll also calculate this thoroughly if you go on to make a full application.',
    },
  },
};

const TELL_US_ABOUT_YOUR_POLICY_PAGE = {
  PAGE_TITLE: 'Tell us about the policy you need',
  HEADING: 'Tell us about the policy you need',
  DESCRIPTION: 'To give you a quote, we need some more information.',
};

const CHECK_YOUR_ANSWERS_PAGE = {
  PAGE_TITLE: 'Check your answers',
  HEADING: 'Check your answers',
  GROUP_HEADING_EXPORT: 'Export details',
  GROUP_HEADING_POLICY: 'Policy details',
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
    NOT_ENOUGH_UK_GOODS_OR_SERVICES: 'your export contract value is not made up from  at least 20% UK goods or services.',
  },
  ACTIONS: {
    INTRO: 'You can:',
    ELIGIBILITY: {
      TEXT: 'read about',
      LINK: {
        TEXT: 'eligibility',
        HREF: '/#eligibility',
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
            text: 'They work for UKEF and are available in every region. They can give you free guidance when making a full application. Find your nearest',
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
  BUYER_COUNTRY_PAGE,
  CAN_GET_PRIVATE_INSURANCE_PAGE,
  UK_GOODS_OR_SERVICES_PAGE,
  TELL_US_ABOUT_YOUR_POLICY_PAGE,
  CHECK_YOUR_ANSWERS_PAGE,
  CANNOT_OBTAIN_COVER_PAGE,
  YOUR_QUOTE_PAGE,
  PAGE_NOT_FOUND_PAGE,
  PROBLEM_WITH_SERVICE_PAGE,
};
