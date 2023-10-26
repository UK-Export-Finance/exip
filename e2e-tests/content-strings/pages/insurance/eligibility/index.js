import { ELIGIBILITY } from '../../../../constants';
import formatCurrency from '../../../../helpers/format-currency';

export const MAX_COVER_AMOUNT = formatCurrency(ELIGIBILITY.MAX_COVER_AMOUNT_IN_GBP);

export const CHECK_IF_ELIGIBLE = {
  PAGE_TITLE: 'Check you can apply for UKEF insurance for your export',
  BODY: 'This will take a couple of minutes. If your export is eligible, you can start the application immediately.',
};

export const INSURED_AMOUNT = {
  PAGE_TITLE: `Do you want to be insured for more than ${MAX_COVER_AMOUNT}?`,
};

export const INSURED_PERIOD = {
  PAGE_TITLE: `Do you want to be insured for longer than ${ELIGIBILITY.MAX_COVER_PERIOD_YEARS} years?`,
};

export const COMPANIES_HOUSE_NUMBER = {
  PAGE_TITLE: 'Do you have a UK Companies House registration number and is your company actively trading?',
};

export const ELIGIBLE_TO_APPLY_ONLINE = {
  PAGE_TITLE: "You're eligible to apply online",
  INSET: 'This does not automatically guarantee cover.',
  BODY: 'You now need to fill in the application so we can assess the risks around your exports and your buyer.',
  SUBMIT_BUTTON: 'Continue to application',
};

export const ACCOUNT_TO_APPLY_ONLINE = {
  PAGE_TITLE: 'Do you already have an account for UKEF export insurance?',
};
