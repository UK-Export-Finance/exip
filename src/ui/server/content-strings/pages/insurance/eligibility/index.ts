import { ELIGIBILITY, GBP_CURRENCY_CODE, TOTAL_CONTRACT_VALUE } from '../../../../constants';
import { ACTIONS } from '../../../actions';
import { LINKS } from '../../../links';
import formatCurrency from '../../../../helpers/format-currency';

const THRESHOLD = formatCurrency(TOTAL_CONTRACT_VALUE.AMOUNT_250K, GBP_CURRENCY_CODE, 0);

const CHECK_IF_ELIGIBLE = {
  PAGE_TITLE: 'Check you can apply for credit insurance for your export',
  INTRO: "Before you start your application, we need to make sure you're eligible. We'll ask you questions about:",
  WILL_ASK_QUESTIONS: ["your buyer's location", 'how long you want your contract to last', 'the value of your contract'],
  WILL_NEED_COMPANIES_HOUSE_NUMBER: "You'll need to provide your Companies House registration number.",
  IF_ELIGIBLE: "If you're eligible, we'll ask you to create an account. Once you've created an account, your progress will be saved automatically.",
  GET_IMMEDIATE_ANSWER:
    "The eligibility check should only take a few minutes to complete and you'll get an answer immediately. If your export is eligible, you can apply right away.",
};

const TOTAL_VALUE_INSURED = {
  PAGE_TITLE: 'What is the total value you want to insure?',
  HINT: `We'll ask you for more information if your export is over ${THRESHOLD}.`,
};

const INSURED_PERIOD = {
  PAGE_TITLE: `Do you want to be insured for longer than ${ELIGIBILITY.MAX_COVER_PERIOD_YEARS} years?`,
};

const HAS_COMPANIES_HOUSE_NUMBER = {
  PAGE_TITLE: 'Do you have a UK Companies House registration number and is your company actively trading?',
};

const COMPANIES_HOUSE_NUMBER = {
  PAGE_TITLE: 'Enter your Companies House number',
};

const COMPANIES_HOUSE_EXIT = {
  PAGE_TITLE: 'You cannot apply for credit insurance',
  ACTIONS,
};

const NO_COMPANIES_HOUSE_NUMBER = {
  ...COMPANIES_HOUSE_EXIT,
  ACTIONS: {
    ...COMPANIES_HOUSE_EXIT.ACTIONS,
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
  ERROR_REASON: 'This is due to technical issues with the Companies House search',
  TRY_AGAIN_PREFIX: 'You can',
  TRY_AGAIN: 'try again in a few minutes.',
  CONTINUE_PREFIX: 'Or you can continue filling in',
  CONTINUE_LINK: 'other sections of your application,',
  CONTINUE_SUFFIX: 'until this problem is resolved',
  INFORMATION: '(You may lose any information you entered on the previous page.)',
};

const COMPANY_NOT_ACTIVE = {
  ...COMPANIES_HOUSE_EXIT,
  BODY: "This is because you do not have a UK Companies House registration number for a company that's actively trading.",
};

const COMPANY_DETAILS = {
  PAGE_TITLE: 'Your company',
  BODY: 'These details come from Companies House.',
  DIFFERENT_COMPANIES_HOUSE_NUMBER: 'Enter a different Companies House registration number',
};

const ELIGIBLE_TO_APPLY_ONLINE = {
  PAGE_TITLE: "You're eligible to apply online",
  INSET: 'This does not automatically guarantee cover.',
  BODY: 'You now need to fill in the application so we can assess the risks around your exports and your buyer.',
  SUBMIT_BUTTON: 'Continue to application',
};

const ACCOUNT_TO_APPLY_ONLINE = {
  PAGE_TITLE: 'Do you already have an account for UKEF export insurance?',
};

export default {
  CHECK_IF_ELIGIBLE,
  TOTAL_VALUE_INSURED,
  INSURED_PERIOD,
  HAS_COMPANIES_HOUSE_NUMBER,
  COMPANIES_HOUSE_NUMBER,
  NO_COMPANIES_HOUSE_NUMBER,
  COMPANIES_HOUSE_UNAVAILABLE,
  COMPANY_NOT_ACTIVE,
  COMPANY_DETAILS,
  ELIGIBLE_TO_APPLY_ONLINE,
  ACCOUNT_TO_APPLY_ONLINE,
};
