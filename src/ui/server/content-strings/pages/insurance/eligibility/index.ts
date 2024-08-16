import { UKEF_CONTACT_DETAILS, GBP_CURRENCY_CODE, TOTAL_CONTRACT_VALUE, APPLICATION } from '../../../../constants';
import { ACTIONS } from '../../../actions';
import { LINKS } from '../../../links';
import formatCurrency from '../../../../helpers/format-currency';

const THRESHOLD = formatCurrency(TOTAL_CONTRACT_VALUE.AMOUNT_250K, GBP_CURRENCY_CODE, 0);

const CHECK_IF_ELIGIBLE = {
  PAGE_TITLE: 'Check you can apply for credit insurance for your export',
  INTRO: "Before you start your application, we need to make sure you're eligible. We'll ask you questions about:",
  WILL_ASK_QUESTIONS: [
    "your buyer's location",
    'how long you want your contract to last',
    'the value of your contract',
    "if you're part of a consortium",
    'relevant group members',
  ],
  WILL_NEED_COMPANIES_HOUSE_NUMBER: "You'll need to provide your Companies House registration number.",
  IF_ELIGIBLE: "If you're eligible, we'll ask you to create an account. Once you've created an account, your progress will be saved automatically.",
  GET_IMMEDIATE_ANSWER:
    "The eligibility check should only take a few minutes to complete and you'll get an answer immediately. If your export is eligible, you can apply right away.",
};

const TOTAL_VALUE_INSURED = {
  PAGE_TITLE: 'What is the total value of the contract you want to insure?',
  HINT: `We offer policies for both single and multiple contracts. We'll ask you for more information if your export is ${THRESHOLD} or above.`,
};

const COVER_PERIOD = {
  PAGE_TITLE: 'How long do you need cover for?',
  HINT: 'This should be the total length of your contract.',
};

const PDF_EXIT = {
  PAGE_TITLE: 'You need to apply through the PDF form instead',
  ACTIONS: {
    PDF_FORM: {
      INTRO: "You can still apply, but you'll need to do so through",
      LINK: {
        TEXT: 'this PDF form instead',
        HREF: LINKS.EXTERNAL.PROPOSAL_FORM,
      },
    },
    CONTACT_EFM: {
      INTRO: 'You should contact',
      LINK: {
        TEXT: 'your nearest export finance manager',
        HREF: ACTIONS.CONTACT_EFM.LINK.HREF,
      },
    },
    CONTACT_UKEF_TEAM: `or our team at ${UKEF_CONTACT_DETAILS.EMAIL.UNDERWRITING} if you have any questions.`,
  },
};

const LONG_TERM_COVER = {
  INTRO: "Currently, this service doesn't provide credit insurance for contracts that are longer than two years.",
  ...PDF_EXIT,
};

const MEMBER_OF_A_GROUP_EXIT = {
  INTRO: 'Currently, this service requires additional details for those who are members of a group.',
  ...PDF_EXIT,
};

const PARTY_TO_CONSORTIUM_EXIT = {
  INTRO: 'Currently, this service requires additional details for those who are party to a consortium.',
  ...PDF_EXIT,
};

const HAS_COMPANIES_HOUSE_NUMBER = {
  PAGE_TITLE: 'Do you have a UK Companies House registration number and is your company actively trading?',
};

const COMPANIES_HOUSE_NUMBER = {
  PAGE_TITLE: 'Enter your Companies House number',
};

const NO_COMPANIES_HOUSE_NUMBER = {
  PAGE_TITLE: 'You cannot apply for credit insurance',
  ACTIONS: {
    ELIGIBILITY: ACTIONS.ELIGIBILITY,
    CONTACT_APPROVED_BROKER: ACTIONS.CONTACT_APPROVED_BROKER,
    CONTACT_EFM: ACTIONS.CONTACT_EFM,
    UPDATE_COMPANY_DETAILS: {
      TEXT: 'update your company details on',
      LINK: {
        TEXT: 'Companies House',
        HREF: LINKS.EXTERNAL.COMPANIES_HOUSE,
      },
    },
  },
  BODY: "This is because you do not have a UK Companies House registration number for a company that's actively trading.",
};

const COMPANIES_HOUSE_UNAVAILABLE = {
  PAGE_TITLE: 'You cannot search for your Companies House registration number right now',
  ERROR_REASON: 'This is due to technical issues with the Companies House search.',
  TRY_AGAIN_PREFIX: 'You can',
  TRY_AGAIN: 'try again in a few minutes.',
  CONTINUE_PREFIX: 'Or you can continue filling in',
  CONTINUE_LINK: 'other sections of your application,',
  CONTINUE_SUFFIX: 'until this problem is resolved',
  INFORMATION: '(You may lose any information you entered on the previous page.)',
};

const COMPANY_NOT_ACTIVE = {
  PAGE_TITLE: 'You need to speak with an export finance manager',
  BODY: 'This is because the company you entered is no longer active on Companies House and we cannot process your application.',
  ACTIONS: {
    INTRO: 'You can still apply. But you should talk to a export finance manager before you try again.',
    FIND_EFM: ACTIONS.FIND_EFM,
  },
};

const COMPANY_DETAILS = {
  PAGE_TITLE: 'Your company',
  BODY: 'These details come from Companies House.',
  DIFFERENT_COMPANIES_HOUSE_NUMBER: 'Enter a different Companies House number',
};

const END_BUYER = {
  PAGE_TITLE: 'Does your buyer need to be paid by someone else before they can pay you?',
};

const CANNOT_APPLY_MULTIPLE_RISKS = {
  PAGE_TITLE: 'You cannot apply for credit insurance',
  INTRO: 'We can only provide cover for a single risk. As your buyer is reliant on an end buyer, it means that we would have to cover two risks:',
  LIST: ['your buyer not paying you', 'your buyer not being paid by their end buyer'],
  ACTIONS: {
    INTRO: 'You may still be able to get cover, but not through this service. Contact',
    CONTACT_EFM: {
      LINK: {
        TEXT: 'your nearest export finance manager',
        HREF: LINKS.EXTERNAL.EXPORT_FINANCE_MANAGERS,
      },
      TEXT: 'to find out more about your options.',
    },
  },
};

const CHECK_YOUR_ANSWERS = {
  HEADING_CAPTION: 'Eligibility',
  PAGE_TITLE: 'Check your answers',
  WARNING: 'Check your answers carefully',
  CANNOT_CHANGE:
    "You cannot change your responses to the eligibility questions once you've submitted them. If you want to change them after this point, you will have to start again.",
};

const ELIGIBLE_TO_APPLY_ONLINE = {
  PAGE_TITLE: "You're eligible to apply for insurance",
  INSET: 'This does not automatically guarantee cover.',
  BODY: 'You now need to fill in the application so we can assess the risks around your exports and your buyer.',
  PRIVACY: {
    INTRO: "We're committed to protecting the privacy and security of the personal information we hold. Read our",
    PRIVACY_NOTICE: {
      LINK: {
        TEXT: 'privacy notice',
        HREF: LINKS.EXTERNAL.PRIVACY,
      },
      TEXT: 'for more details.',
    },
  },
  CONTINUE_SUBMIT: `Once you continue your application you will have ${APPLICATION.SUBMISSION_DEADLINE_IN_DAYS} days to submit it.`,
  SUBMIT_BUTTON: 'Continue to application',
};

const HAVE_AN_ACCOUNT = {
  PAGE_TITLE: 'Do you have an account with us?',
};

const CONTRACT_TOO_SHORT = {
  PAGE_TITLE: 'Talk to an export finance manager',
  INTRO: "We don't offer short term cover for the country you've selected.",
  CAN_STILL_APPLY:
    "You can still apply for credit insurance through UKEF, but you'll need to speak to an export finance manager instead of using this digital application service.",
  CONTACT_EFM: {
    INTRO: 'Contact',
    LINK: {
      TEXT: 'your nearest export finance manager',
      HREF: LINKS.EXTERNAL.EXPORT_FINANCE_MANAGERS,
    },
    TEXT: `to learn more about your options. If you have any questions, get in touch with our team at ${UKEF_CONTACT_DETAILS.EMAIL.UNDERWRITING}.`,
  },
};

const PARTY_TO_CONSORTIUM = {
  PAGE_TITLE: 'Are you, or will you be a party to any consortium in connection with the performance or financing of any part of the export contract(s)?',
};

const MEMBER_OF_A_GROUP = {
  PAGE_TITLE:
    'Are you a member of a group of which another member has, or is intended to have, a material part in negotiating or obtaining the export contract(s)?',
};

export default {
  CHECK_IF_ELIGIBLE,
  TOTAL_VALUE_INSURED,
  COVER_PERIOD,
  LONG_TERM_COVER,
  HAS_COMPANIES_HOUSE_NUMBER,
  COMPANIES_HOUSE_NUMBER,
  NO_COMPANIES_HOUSE_NUMBER,
  COMPANIES_HOUSE_UNAVAILABLE,
  COMPANY_NOT_ACTIVE,
  COMPANY_DETAILS,
  END_BUYER,
  CANNOT_APPLY_MULTIPLE_RISKS,
  CHECK_YOUR_ANSWERS,
  ELIGIBLE_TO_APPLY_ONLINE,
  HAVE_AN_ACCOUNT,
  CONTRACT_TOO_SHORT,
  PARTY_TO_CONSORTIUM,
  MEMBER_OF_A_GROUP,
  MEMBER_OF_A_GROUP_EXIT,
  PARTY_TO_CONSORTIUM_EXIT,
};
