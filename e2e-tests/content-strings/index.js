const FIELD_IDS = require('../constants/field-ids');
const FIELD_VALUES = require('../constants/field-values');

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
  CHANGE: 'Change',
};

const FIELDS = {
  [FIELD_IDS.COUNTRY]: {
    TITLE: 'Company',
    HINT: 'Some countries are not covered by UK Export Finance. If your chosen destination is not in the list, then we cannot provide cover for it.',
  },
  [FIELD_IDS.VALID_COMPANY_BASE]: {
    TITLE: 'Company',
  },
  [FIELD_IDS.VALID_BUYER_BASE]: {
    TITLE: 'Buyer location',
  },
  [FIELD_IDS.TRIED_PRIVATE_COVER]: {
    TITLE: 'Private insurance',
  },
  [FIELD_IDS.FINAL_DESTINATION]: {
    TITLE: 'Export destination',
  },
  [FIELD_IDS.UK_CONTENT_PERCENTAGE]: {
    TITLE: 'UK Content',
    LABEL: 'Percentage of your export that is UK content',
    HINT: 'Enter the UK content of your export as a percentage.',
  },
  [FIELD_IDS.CREDIT_LIMIT_GROUP]: {
    HEADING: 'What credit limit do you need?',
    HINT: 'Enter the currency and credit limit required for this export.',
  },
  [FIELD_IDS.CREDIT_LIMIT_CURRENCY]: {
    TITLE: 'Credit limit currency',
    LABEL: 'Credit limit currency',
  },
  [FIELD_IDS.CREDIT_LIMIT]: {
    TITLE: 'Credit limit',
    LABEL: 'Credit limit',
  },
  [FIELD_IDS.PRE_CREDIT_PERIOD]: {
    TITLE: 'Pre-credit period',
    LABEL: 'What pre-credit period do you need? (optional)',
    HINT: 'The pre-credit period is the number of days that you require cover for costs incurred under your export contract, before the goods or services are supplied to your buyer.',
  },
  [FIELD_IDS.CREDIT_PERIOD]: {
    TITLE: 'Credit period',
    LABEL: 'What credit period do you need?',
    HINT: 'The credit period is the number of days that your customer is allowed to wait before paying their invoice.',
  },
  [FIELD_IDS.POLICY_LENGTH]: {
    TITLE: 'Policy length',
    LABEL: 'How long do you need the policy for?',
    HINT: 'Enter the required policy length in months.',
  },
  [FIELD_IDS.POLICY_TYPE]: {
    TITLE: 'Policy type',
    LABEL: 'What kind of policy do you need?',
    HINT: 'If known, select the type of policy you need.',
    OPTIONS: {
      SINGLE: {
        VALUE: FIELD_VALUES.POLICY_TYPE.SINGLE,
        TEXT: 'Single policy',
        HINT: 'Single policies offer cover for a single export contract with a specific buyer for a pre-determined value.',
      },
      MULTI: {
        VALUE: FIELD_VALUES.POLICY_TYPE.MULTI,
        TEXT: 'Multi policy (also known as a revolving policy)',
        HINT: 'Multi policies offer cover for multiple export contracts or orders with the same buyer for up to 12 months where you are able to estimate the total value of the exports during that time.',
      },
    },
  },
};

const SUMMARY = {
  [FIELD_IDS.VALID_COMPANY_BASE]: 'Located in the UK',
  [FIELD_IDS.VALID_BUYER_BASE]: 'Outside of the UK',
  [FIELD_IDS.TRIED_PRIVATE_COVER]: 'Private cover not available',
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

const UK_CONTENT_PERCENTAGE_PAGE = {
  PAGE_TITLE: 'What percentage of your export is UK content?',
  HEADING: 'What percentage of your export is UK content?',
  DESCRIPTION_1: 'UK content is an export contract’s value less the cost to you of buying any goods and/or services from suppliers outside the UK, the Isle of Man or the Channel Islands, to be supplied directly to the buyer or otherwise “as is”.',
  DESCRIPTION_2: 'Materials and components in goods manufactured or assembled in the UK, the Isle of Man or the Channel Islands, which would be eligible for a certificate of UK origin from a British Chamber of Commerce are treated as UK content.',
  WARNING: 'In order to submit a full application you will need to provide evidence that the export contains a minimum of 20% UK content.',
};

const TELL_US_ABOUT_YOUR_DEAL_PAGE = {
  PAGE_TITLE: 'Tell us about your deal',
  HEADING: 'Tell us about your deal',
  DESCRIPTION: 'In order to give you a premium quote, we need some information on your deal.',
};

const CHECK_YOUR_ANSWERS_PAGE = {
  PAGE_TITLE: 'Check your answers before you submit',
  HEADING: 'Check your answers before you submit',
  GROUP_HEADING_COMPANY: 'Company details',
  GROUP_HEADING_EXPORT: 'Export details',
  GROUP_HEADING_DEAL: 'Deal details',
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

const ERROR_MESSAGES = {
  [FIELD_IDS.VALID_COMPANY_BASE]: 'Select if your company is based in the UK, Channel Islands, Isle of Man or not',
  [FIELD_IDS.VALID_BUYER_BASE]: 'Select if your buyer is based outside the UK, Channel Islands, Isle of Man or not',
  [FIELD_IDS.TRIED_PRIVATE_COVER]: 'Select if you have tried to obtain private insurance or not',
  [FIELD_IDS.COUNTRY]: 'Select the final destination for your export',
  [FIELD_IDS.UK_CONTENT_PERCENTAGE]: {
    IS_EMPTY: 'Enter the percentage of your export that is UK content',
    NOT_A_NUMBER: `${FIELDS[FIELD_IDS.UK_CONTENT_PERCENTAGE].LABEL} must be a number`,
    BELOW_MINIMUM: `${FIELDS[FIELD_IDS.UK_CONTENT_PERCENTAGE].LABEL} must be 0 or more`,
    ABOVE_MAXIMUM: `${FIELDS[FIELD_IDS.UK_CONTENT_PERCENTAGE].LABEL} must be 100 or fewer`,
  },
  [FIELD_IDS.CREDIT_LIMIT_GROUP]: {
    IS_EMPTY: 'Select the currency and input the credit limit needed',
  },
  [FIELD_IDS.CREDIT_LIMIT]: {
    NOT_A_NUMBER: `${FIELDS[FIELD_IDS.CREDIT_LIMIT].TITLE} must be a number`,
  },
  [FIELD_IDS.PRE_CREDIT_PERIOD]: {
    NOT_A_NUMBER: `${FIELDS[FIELD_IDS.PRE_CREDIT_PERIOD].TITLE} must be a number`,
  },
  [FIELD_IDS.CREDIT_PERIOD]: {
    IS_EMPTY: 'Enter the credit period needed',
    NOT_A_NUMBER: `${FIELDS[FIELD_IDS.CREDIT_PERIOD].TITLE} must be a number`,
  },
  [FIELD_IDS.POLICY_LENGTH]: {
    IS_EMPTY: 'Enter the credit policy length needed',
    NOT_A_NUMBER: `${FIELDS[FIELD_IDS.POLICY_LENGTH].TITLE} must be a number`,
  },
  [FIELD_IDS.POLICY_TYPE]: 'Select an option for the policy type needed',
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

module.exports = {
  BUTTONS,
  LINKS,
  FIELDS,
  SUMMARY,
  ORGANISATION,
  PRODUCT,
  FOOTER,
  LANDING_PAGE,
  COMPANY_BASED_PAGE,
  BUYER_BASED_PAGE,
  TRIED_TO_OBTAIN_COVER_PAGE,
  FINAL_DESTINATION_PAGE,
  UK_CONTENT_PERCENTAGE_PAGE,
  TELL_US_ABOUT_YOUR_DEAL_PAGE,
  CHECK_YOUR_ANSWERS_PAGE,
  PAGE_NOT_FOUND_PAGE,
  PROBLEM_WITH_SERVICE_PAGE,
  ERROR_MESSAGES,
  EXIT_PAGES,
};
