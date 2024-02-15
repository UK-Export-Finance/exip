import { FIELD_IDS } from '../../../../constants';
import { FORM_TITLES } from '../../../form-titles';

const {
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION,
    CONNECTION_WITH_BUYER,
    TRADED_WITH_BUYER,
    CONNECTION_WITH_BUYER_DESCRIPTION,
    OUTSTANDING_PAYMENTS,
    FAILED_PAYMENTS,
    HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
    PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
    TOTAL_OUTSTANDING_PAYMENTS,
    TOTAL_AMOUNT_OVERDUE,
    HAS_BUYER_FINANCIAL_ACCOUNTS,
  },
  CURRENCY: { CURRENCY_CODE },
} = FIELD_IDS.INSURANCE;

const {
  YOUR_BUYER: {
    COMPANY_DETAILS, TRADING_HISTORY, CONNECTION_TO_BUYER, CREDIT_INSURANCE_HISTORY, FINANCIAL_ACCOUNTS,
  },
} = FORM_TITLES;

export const YOUR_BUYER_FIELDS = {
  COMPANY_OR_ORGANISATION: {
    [COMPANY_OR_ORGANISATION.NAME]: {
      LABEL: "Buyer's company or organisation name",
      SUMMARY: {
        TITLE: 'Company or organisation name',
        FORM_TITLE: COMPANY_DETAILS,
      },
    },
    [COMPANY_OR_ORGANISATION.ADDRESS]: {
      LABEL: 'Company address',
      MAXIMUM: 1000,
      SUMMARY: {
        TITLE: 'Buyer address',
        FORM_TITLE: COMPANY_DETAILS,
      },
    },
    [COMPANY_OR_ORGANISATION.COUNTRY]: {
      LABEL: 'Buyer country',
    },
    [COMPANY_OR_ORGANISATION.REGISTRATION_NUMBER]: {
      LABEL: 'Company registration number (optional)',
      SUMMARY: {
        TITLE: 'Registration number (optional)',
        FORM_TITLE: COMPANY_DETAILS,
      },
    },
    [COMPANY_OR_ORGANISATION.WEBSITE]: {
      LABEL: 'Enter their website (optional)',
      SUMMARY: {
        TITLE: 'Buyer website (optional)',
        FORM_TITLE: COMPANY_DETAILS,
      },
    },
  },
  [CONNECTION_WITH_BUYER]: {
    LABEL: 'Are you connected with the buyer in any way?',
    HINT: "For example, someone in your company is a shareholder or director of the buyer's company.",
    SUMMARY: {
      TITLE: 'Connected with the buyer',
      FORM_TITLE: CONNECTION_TO_BUYER,
    },
  },
  [CONNECTION_WITH_BUYER_DESCRIPTION]: {
    LABEL: 'Describe the connection with the buyer',
    MAXIMUM: 1000,
    SUMMARY: {
      TITLE: 'Details of connection',
      FORM_TITLE: CONNECTION_TO_BUYER,
    },
  },
  [TRADED_WITH_BUYER]: {
    LABEL: 'Have you traded with this buyer before?',
    HINT: 'If yes, we will request a copy of your trading history once the application has been submitted.',
    SUMMARY: {
      TITLE: 'Trading history',
      FORM_TITLE: TRADING_HISTORY,
    },
  },
  [OUTSTANDING_PAYMENTS]: {
    LABEL: 'Do you currently have any outstanding or overdue payments from the buyer?',
    SUMMARY: {
      TITLE: 'Outstanding or overdue payments',
      FORM_TITLE: TRADING_HISTORY,
    },
  },
  [FAILED_PAYMENTS]: {
    LABEL: 'Has the buyer ever failed to pay you on time?',
    SUMMARY: {
      TITLE: 'Buyer failed to pay on time?',
      FORM_TITLE: TRADING_HISTORY,
    },
  },
  [CURRENCY_CODE]: {
    LEGEND: 'What currency are the outstanding or overdue payments in?',
  },
  [HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]: {
    LABEL: 'Have you in the past held credit insurance cover on the buyer?',
    SUMMARY: {
      TITLE: 'Credit insurance previously held for the buyer',
      FORM_TITLE: CREDIT_INSURANCE_HISTORY,
    },
  },
  [PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]: {
    LABEL: 'Tell us about the credit insurance cover you had on the buyer',
    HINT: 'Include the name of the insurer(s) and the credit limit.',
    MAXIMUM: 1000,
    SUMMARY: {
      TITLE: 'Details of credit insurance',
      FORM_TITLE: CREDIT_INSURANCE_HISTORY,
    },
  },
  [TOTAL_OUTSTANDING_PAYMENTS]: {
    HEADING: 'Tell us about the outstanding or overdue payments',
    LABEL: 'Total outstanding, including overdue',
    SUMMARY: {
      TITLE: 'Total outstanding including overdue',
      FORM_TITLE: TRADING_HISTORY,
    },
  },
  [TOTAL_AMOUNT_OVERDUE]: {
    LABEL: 'Amount overdue',
    SUMMARY: {
      TITLE: 'Amount overdue',
      FORM_TITLE: TRADING_HISTORY,
    },
  },
  [HAS_BUYER_FINANCIAL_ACCOUNTS]: {
    SUMMARY: {
      TITLE: 'Financial accounts relating to the buyer',
      FORM_TITLE: FINANCIAL_ACCOUNTS,
    },
  },
};
