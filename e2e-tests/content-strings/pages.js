const PRODUCT = require('./product');

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

module.exports = {
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
};
