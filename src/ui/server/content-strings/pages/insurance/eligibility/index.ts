import { GBP_CURRENCY_CODE, ELIGIBILITY } from '../../../../constants';
import formatCurrency from '../../../../helpers/format-currency';

const MAX_COVER_AMOUNT = formatCurrency(ELIGIBILITY.MAX_COVER_AMOUNT_IN_GBP, GBP_CURRENCY_CODE, 0);

const CHECK_IF_ELIGIBLE = {
  PAGE_TITLE: 'Check you can apply for UKEF insurance for your export',
  BODY: 'This will take a couple of minutes. If your export is eligible, you can start the application immediately.',
};

const INSURED_AMOUNT = {
  PAGE_TITLE: `Do you want to be insured for more than ${MAX_COVER_AMOUNT}?`,
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

const COMPANY_DETAILS = {
  PAGE_TITLE: 'Your company',
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
  HAS_COMPANIES_HOUSE_NUMBER,
  COMPANIES_HOUSE_NUMBER,
  COMPANIES_HOUSE_UNAVAILABLE,
  COMPANY_DETAILS,
  ELIGIBLE_TO_APPLY_ONLINE,
  ACCOUNT_TO_APPLY_ONLINE,
};
