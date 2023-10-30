import { ELIGIBILITY } from '../../../../constants';
import formatCurrency from '../../../../helpers/format-currency';
import { ACTIONS } from '../../../actions';
import { LINKS } from '../../../links';

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

export const HAS_COMPANIES_HOUSE_NUMBER = {
  PAGE_TITLE: 'Do you have a UK Companies House registration number and is your company actively trading?',
};

export const COMPANIES_HOUSE_NUMBER = {
  PAGE_TITLE: 'Enter your Companies House number',
};

export const NO_COMPANIES_HOUSE_NUMBER = {
  PAGE_TITLE: 'You cannot apply for credit insurance',
  BODY:
    "This is because you do not have a UK Companies House registration number for a company that's actively trading.",
  ACTIONS: {
    ...ACTIONS,
    UPDATE_COMPANY_DETAILS: {
      TEXT: 'update your company details on',
      LINK: {
        TEXT: 'Companies House',
        HREF: LINKS.EXTERNAL.COMPANIES_HOUSE,
      },
    },
    CONTACT_EFM: {
      LINK: {
        TEXT: 'talk to your nearest export finance manager',
        HREF: LINKS.EXTERNAL.EXPORT_FINANCE_MANAGERS,
      },
      TEXT: 'to find out more about your options',
    },
  },
};

export const COMPANIES_HOUSE_UNAVAILABLE = {
  PAGE_TITLE: 'You cannot search for your Companies House registration number right now',
  ERROR_REASON: 'This is due to technical issues with the Companies House search',
  TRY_AGAIN_PREFIX: 'You can',
  TRY_AGAIN: 'try again in a few minutes.',
  CONTINUE_PREFIX: 'Or you can continue filling in',
  CONTINUE_LINK: 'other sections of your application,',
  CONTINUE_SUFFIX: 'until this problem is resolved',
  INFORMATION: '(You may lose any information you entered on the previous page.)',
};

export const COMPANY_DETAILS = {
  PAGE_TITLE: 'Your company',
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
