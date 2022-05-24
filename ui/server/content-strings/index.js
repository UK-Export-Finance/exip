const CONSTANTS = require('../constants');

const ORGANISATION = 'UK Export Finance';

const PRODUCT = {
  DESCRIPTION: 'Check if you can apply for export insurance',
};

const FOOTER = {
  HEADING: 'Contact us',
  EMAIL: {
    HEADING: 'Email',
    VALUE: 'DigitalService.TradeFinance@ukexportfinance.gov.uk',
  },
  PHONE: {
    HEADING: 'Phone',
    VALUE: '+44 (0)207 271 8010',
  },
  OPENING_TIMES: {
    HEADING: 'Opening times',
    VALUE: 'Monday to Friday, 9am to 5pm (excluding public holidays)',
  },
  SUPPORT_LINKS_HEADING: 'Support Links',
  MASTER_GUARANTEE_AGREEMENT: {
    TEXT: 'Master Guarantee Agreement',
    HREF: '#',
  },
  TERMS_AND_CONDITIONS: {
    TEXT: 'Terms and conditions',
    HREF: '#',
  },
  REPORT_VULNERABILITY: {
    TEXT: 'Report a vulnerability',
    HREF: 'https://www.gov.uk/guidance/report-a-vulnerability-on-a-ukef-system',
  },
  OGL_LICENCE: {
    INTRO: 'All content is available under the',
    LICENCE: 'Open Government Licence v3.0',
    DISCLAIMER: 'except where otherwise stated',
    HREF: 'https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3',
  },
  CROWN_COPYRIGHT: {
    TEXT: 'Crown copyright',
    HREF: 'https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/',
  },
};

const BUTTONS = {
  CONTINUE: 'Continue',
  SUBMIT: 'Submit',
  START_APPLICATION: 'Start an application',
};

const LINKS = {
  BACK: 'Back',
};

const FIELDS = {
  [CONSTANTS.FIELDS.COUNTRY]: {
    HINT: 'Some countries are not covered by UK Export Finance. If your chosen destination is not in the list, then we cannot provide cover for it.',
  },
};

const LANDING_PAGE = {
  PAGE_TITLE: PRODUCT.DESCRIPTION,
  HEADING: PRODUCT.DESCRIPTION,
  DESCRIPTION: 'We can help UK based exporters manage risks in challenging markets, ensuring that they get paid even where the private market is not able to offer insurance.',
  COVERS_AGAINST: {
    INTRO: 'Our Export Insurance Policy offers cover against the risk of:',
    LIST: [
      {
        text: 'not being paid under an export contract',
      },
      {
        text: 'not being able to recover the costs of performing that contract because of certain events which prevent its performance or lead to its termination',
      },
    ],
  },
  USE_SERVICE_TO: {
    INTRO: 'Use this service to:',
    LIST: [
      {
        text: 'check if you can apply for export insurance for a specific export',
      },
      {
        text: 'get a premium quote',
      },
    ],
  },
  COMPLETION_TIME: 'Checking eligibility takes around 5 minutes.',
  SUBMIT_BUTTON: 'Start now',
  BEFORE_YOU_START: {
    HEADING: 'Before you start',
    INTRO: 'You can read more about:',
    LIST: [
      {
        text: 'how export insurance works',
        href: '#',
      },
      {
        text: 'benefits',
        href: '#',
      },
      {
        text: 'eligibility criteria',
        href: '#',
      },
      {
        text: 'how to apply',
        href: '#',
      },
      {
        text: 'product documentation and application form',
        href: '#',
      },
      {
        text: 'more information',
        href: '#',
      },
    ],
  },
};

const COMPANY_BASED_PAGE = {
  PAGE_TITLE: 'Is your company based inside the UK, Channel Islands and Isle of Man?',
  HEADING: 'Is your company based inside the UK, Channel Islands and Isle of Man?',
};

const BUYER_BASED_PAGE = {
  PAGE_TITLE: 'Is your buyer based outside of the UK, Channel Islands and Isle of Man?',
  HEADING: 'Is your buyer based outside of the UK, Channel Islands and Isle of Man?',
};

const TRIED_TO_OBTAIN_COVER_PAGE = {
  PAGE_TITLE: 'Have you tried, and been unable, to obtain cover for your export contract(s) with this buyer from the private insurance market?',
  HEADING: 'Have you tried, and been unable, to obtain cover for your export contract(s) with this buyer from the private insurance market?',
  WARNING: 'In order to submit a full application you will need to provide evidence that you were unable to obtain cover from a private insurer for this export.',
};

const FINAL_DESTINATION_PAGE = {
  PAGE_TITLE: 'What is the final destination for your export?',
  HEADING: 'What is the final destination for your export?',
};

const PROBLEM_WITH_SERVICE_PAGE = {
  PAGE_TITLE: 'Problem with the service',
  HEADING: 'Sorry, there is a problem with the service',
};

const ERROR_MESSAGES = {
  [CONSTANTS.FIELDS.VALID_COMPANY_BASE]: 'Select if your company is based in the UK, Channel Islands, Isle of Man or not',
  [CONSTANTS.FIELDS.VALID_BUYER_BASE]: 'Select if your buyer is based outside the UK, Channel Islands, Isle of Man or not',
  [CONSTANTS.FIELDS.TRIED_PRIVATE_COVER]: 'Select if you have tried to obtain private insurance or not',
  [CONSTANTS.FIELDS.COUNTRY]: 'Select the final destination for your export',
};

const EXIT_PAGES = {
  ACTIONS: {
    INTRO: 'You can:',
    LIST: [
      {
        text: 'read more about how this service works',
        href: '#',
      },
      {
        text: 'contact an approved broker who may be able to help you obtain private insurance',
        href: '#',
      },
    ],
  },
};

EXIT_PAGES.COMPANY_BASED = {
  PAGE_TITLE: 'Export insurance is only available to companies based inside the UK, Channel Islands and Isle of Man',
  HEADING: 'Export insurance is only available to companies based inside the UK, Channel Islands and Isle of Man.',
  DESCRIPTION: 'You cannot apply for export insurance if your company is not based in the UK, Channel Islands or Isle of Man.',
  ACTIONS: EXIT_PAGES.ACTIONS,
};

EXIT_PAGES.BUYER_BASED = {
  PAGE_TITLE: 'Export insurance is only available when the buyer is based outside of the UK, Channel Islands and Isle of Man',
  HEADING: 'Export insurance is only available when the buyer is based outside of the UK, Channel Islands and Isle of Man.',
  DESCRIPTION: 'You cannot apply for export insurance if your buyer is based in the UK, Channel Islands or Isle of Man.',
  ACTIONS: EXIT_PAGES.ACTIONS,
};

const CONTENT_STRINGS = {
  BUTTONS,
  LINKS,
  FIELDS,
  ORGANISATION,
  PRODUCT,
  FOOTER,
  LANDING_PAGE,
  COMPANY_BASED_PAGE,
  BUYER_BASED_PAGE,
  TRIED_TO_OBTAIN_COVER_PAGE,
  FINAL_DESTINATION_PAGE,
  PROBLEM_WITH_SERVICE_PAGE,
  ERROR_MESSAGES,
  EXIT_PAGES,
};

module.exports = CONTENT_STRINGS;
