const PRODUCT = require('./product');

const LANDING_PAGE = {
  PAGE_TITLE: PRODUCT.DESCRIPTION,
  HEADING: PRODUCT.DESCRIPTION,
  INTRO_1: 'If you’re an exporter and having problems getting export insurance, you may be able to get cover from UK Export Finance (UKEF).',
  INTRO_2: 'This is sometimes known as credit insurance.',
  INTRO_3: 'You can get cover for up to 2 years (credit terms)',

  COVERS: {
    HEADING: 'What UK export insurance covers',
    INTRO: 'It covers you if:',
    LIST: [
      {
        text: 'your buyer fails to pay you for an export',
      },
      {
        text: 'you lose money when a contract cannot be carried out or is terminated early due to certain events',
      },
    ],
  },
  USE_SERVICE_TO: {
    INTRO: 'Use this service to:',
    LIST: [
      {
        text: 'check if you`re eligible',
      },
      {
        text: 'get a non-binding quote for single or multiple exports to one buyer',
      },
    ],
  },
  YOU_WILL_NEED: 'You`ll need to get a separate quote for each buyer you want to export to.',
  COMPLETION_TIME: 'It takes around 5 minutes.',
  SUBMIT_BUTTON: 'Start now',
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
