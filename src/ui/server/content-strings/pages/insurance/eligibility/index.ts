import { GBP_CURRENCY_CODE, ELIGIBILITY } from '../../../../constants';
import formatCurrency from '../../../../helpers/format-currency';

const MAX_COVER_AMOUNT = formatCurrency(ELIGIBILITY.MAX_COVER_AMOUNT_IN_GBP, GBP_CURRENCY_CODE, 0);

const CHECK_IF_ELIGIBLE = {
  PAGE_TITLE: 'Check you can apply for credit insurance for your export',
  INTRO: "Before you start your application, we need to make sure you're eligible. We'll ask you questions about:",
  WILL_ASK_QUESTIONS: ["your buyer's location", 'how long you want your contract to last', 'the value of your contract'],
  WILL_NEED_COMPANIES_HOUSE_NUMBER: "You'll need to provide your Companies House registration number.",
  IF_ELIGIBLE: "If you're eligible, we'll ask you to create an account. Once you've created an account, your progress will be saved automatically.",
  GET_IMMEDIATE_ANSWER:
    "The eligibility check should only take a few minutes to complete and you'll get an answer immediately. If your export is eligible, you can apply right away.",
};

const INSURED_AMOUNT = {
  PAGE_TITLE: `Do you want to be insured for more than ${MAX_COVER_AMOUNT}?`,
};

const INSURED_PERIOD = {
  PAGE_TITLE: `Do you want to be insured for longer than ${ELIGIBILITY.MAX_COVER_PERIOD_YEARS} years?`,
};

const COMPANIES_HOUSE_NUMBER = {
  PAGE_TITLE: 'Do you have a UK Companies House registration number and is your company actively trading?',
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
  INSURED_AMOUNT,
  INSURED_PERIOD,
  COMPANIES_HOUSE_NUMBER,
  ELIGIBLE_TO_APPLY_ONLINE,
  ACCOUNT_TO_APPLY_ONLINE,
};
