import { LINKS } from './links';

export const UK_GOODS_AND_SERVICES_DESCRIPTION = {
  INTRO: 'What counts as UK goods and services?',
  INCLUDES: {
    INTRO: 'UK goods and services include:',
    PRODUCTS: 'products made in the UK',
    MANUFACTURED_1: 'goods manufactured outside the UK but processed or modified in the UK, which would then be eligible for a certificate of UK origin',
    MANUFACTURED_2: 'goods manufactured outside of the UK but are eligible for a certificate of UK origin',
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
    TEXT: 'Goods or services from outside the UK that are sent to the buyer without processing or modifying them. These count as foreign goods and services.',
  },
  STAFFING_COSTS: {
    HEADING: 'Staffing costs for this export contract',
    TEXT: 'You can count the following (only count the actual staffing costs from this export contract):',
    LIST: [
      {
        TEXT: 'employees of your UK business',
      },
      {
        TEXT: 'contractors supplied to you by a UK-contractor',
      },
      {
        TEXT: "staff seconded from abroad to work for you in the UK on the export contract that you're financially responsible for",
      },
    ],
  },
  NON_PHYSICAL_ASSETS: {
    HEADING: 'Non-physical assets',
    TEXT: "Some assets cannot have a certificate of origin as they're not physical goods. For example, a licence to manufacture goods in another country. But they still count as UK goods or services if they originate from the UK.",
  },
  NOT_SURE: {
    HEADING: "If you're not sure",
    BODY_1: 'You can speak with',
    LINK: {
      TEXT: 'an export finance manager',
      HREF: LINKS.EXTERNAL.EXPORT_FINANCE_MANAGERS,
    },
    BODY_2: 'if you need more information about what counts for UK goods and services.',
  },
};
