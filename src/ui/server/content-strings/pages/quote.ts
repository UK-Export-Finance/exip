import { LINKS } from '../links';

const BUYER_BODY = {
  PAGE_TITLE: 'Is your buyer a government or public sector body?',
  HEADING: 'Is your buyer a government or public sector body?',
  DETAILS: {
    INTRO: 'What counts as a government or public sector body?',
    BODY_1: 'This means a formally established organisation that is, at least in part, publicly funded to deliver a public or government service.',
    BODY_2: 'For example, a central government department, a local authority or a public utlity company.',
  },
};

const HAS_MINIMUM_UK_GOODS_OR_SERVICES = {
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

const POLICY_TYPE = {
  PAGE_TITLE: 'What kind of policy do you need?',
  HEADING: 'What kind of policy do you need?',
};

const TELL_US_ABOUT_YOUR_POLICY = {
  SINGLE_POLICY_PAGE_TITLE: 'Tell us about the single contract policy you need',
  SINGLE_POLICY_HEADING: 'Tell us about the single contract policy you need',
  MULTI_POLICY_PAGE_TITLE: 'Tell us about the multiple contract policy you need',
  MULTI_POLICY_HEADING: 'Tell us about the multiple contract policy you need',
};

const CHECK_YOUR_ANSWERS = {
  PAGE_TITLE: 'Check your answers',
  HEADING: 'Check your answers',
  GROUP_HEADING_EXPORT: 'Export details',
  GROUP_HEADING_POLICY: 'Policy details',
  SUBMIT_BUTTON: 'Get your quote',
};

const GET_A_QUOTE_BY_EMAIL = {
  PAGE_TITLE: 'You need to get a quote by email',
  HEADING: 'You need to get a quote by email',
  REASON: {
    BUYER_BODY: 'We cannot give you a quote online because your buyer is a government or public sector body.',
    BUYER_BODY_DESCRIPTION: 'We can still give you a quote but may need extra information from you to assess the risks around your buyer first.',
    BUYER_COUNTRY: 'We cannot give you a quote online because of the country where your buyer is based.',
    BUYER_COUNTRY_DESCRIPTION: "We can still give you a quote but may need extra information from you to assess the risks around your buyer's country first.",
  },
  ACTION: [
    [
      {
        text: 'Download this form',
        href: LINKS.EXTERNAL.NBI_FORM,
      },
      {
        text: ' and fill it in. ',
      },
      {
        text: 'Email it to',
      },
      {
        text: 'exipunderwriting@ukexportfinance.gov.uk',
        href: 'mailto:exipunderwriting@ukexportfinance.gov.uk',
      },
    ],
  ],
};

const YOUR_QUOTE = {
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
          href: LINKS.EXTERNAL.FULL_APPLICATION,
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

const NEED_TO_START_AGAIN = {
  PAGE_TITLE: 'You need to start again',
  HEADING: 'You need to start again',
  REASON: 'This is because you have not yet answered all the eligibility questions.',
};

export default {
  BUYER_BODY,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  POLICY_TYPE,
  TELL_US_ABOUT_YOUR_POLICY,
  CHECK_YOUR_ANSWERS,
  GET_A_QUOTE_BY_EMAIL,
  YOUR_QUOTE,
  NEED_TO_START_AGAIN,
};
