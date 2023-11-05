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

export const OTHER_PARTIES_INVOLVED = {
  PAGE_TITLE: 'Are there any other parties involved, apart from you and the buyer?',
  OTHER_PARTIES_DESCRIPTION: {
    INTRO: 'What counts as another party?',
    LIST_INTRO: 'This includes any:',
    LIST: [
      {
        TEXT: 'agents or third parties',
      },
      {
        TEXT: "companies who'll be jointly insured on the policy",
      },
      {
        TEXT: "'loss payees' who'll be paid in the event of a claim",
      },
      {
        TEXT: "other parties in your buyer's supply chain, who your buyer will depend on for payment before they can pay you - for example, an end-buyer",
      },
      {
        TEXT: "consortium or group you're involved in that has a significant role in these exports",
      },
    ],
  },
};

export const LETTER_OF_CREDIT = {
  PAGE_TITLE: 'Will you be paid by a letter of credit?',
};

export const PRE_CREDIT_PERIOD = {
  PAGE_TITLE: 'Do you need cover for a period before you supply the goods or services to the buyer?',
  PRE_CREDIT_PERIOD_DESCRIPTION: {
    INTRO: 'What is the pre-credit period?',
    BODY_1: 'This insures you for when you start working on the exports but before you send goods or extend any credit to your buyer.',
    LIST_INTRO: 'For example, you may incur costs when:',
    LIST: [
      {
        TEXT: 'manufacturing goods',
      },
      {
        TEXT: 'preparing services',
      },
    ],
    BODY_2: "But it's too early to invoice the buyer and recover these costs.",
    BODY_3: 'This is considered the pre-credit period.',
  },
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
