import { FIELD_IDS, MAXIMUM_CHARACTERS } from '../../../../constants';

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

export const YOUR_BUYER_FIELDS = {
  COMPANY_OR_ORGANISATION: {
    [COMPANY_OR_ORGANISATION.NAME]: {
      LABEL: "Buyer's company or organisation name",
      SUMMARY: {
        TITLE: 'Company or organisation name',
      },
    },
    [COMPANY_OR_ORGANISATION.ADDRESS]: {
      LABEL: 'Company address',
      SUMMARY: {
        TITLE: 'Buyer address',
      },
      MAXIMUM: MAXIMUM_CHARACTERS.FULL_ADDRESS,
    },
    [COMPANY_OR_ORGANISATION.COUNTRY]: {
      LABEL: 'Buyer country',
      SUMMARY: {
        TITLE: 'Buyer country',
      },
    },
    [COMPANY_OR_ORGANISATION.REGISTRATION_NUMBER]: {
      LABEL: 'Company registration number (optional)',
      SUMMARY: {
        TITLE: 'Registration number (optional)',
      },
      MAXIMUM: MAXIMUM_CHARACTERS.BUYER.REGISTRATION_NUMBER,
    },
    [COMPANY_OR_ORGANISATION.WEBSITE]: {
      LABEL: 'Enter their website (optional)',
      SUMMARY: {
        TITLE: 'Buyer website (optional)',
      },
    },
  },
  [CONNECTION_WITH_BUYER]: {
    LABEL: 'Are you connected with the buyer in any way?',
    HINT: "For example, someone in your company is a shareholder or director of the buyer's company.",
    SUMMARY: {
      TITLE: 'Connected with the buyer',
    },
  },
  [CONNECTION_WITH_BUYER_DESCRIPTION]: {
    LABEL: 'Describe the connection with the buyer',
    SUMMARY: {
      TITLE: 'Details of connection',
    },
  },
  [TRADED_WITH_BUYER]: {
    SUMMARY: {
      TITLE: 'Trading history',
    },
  },
  [OUTSTANDING_PAYMENTS]: {
    LABEL: 'Do you currently have any outstanding or overdue payments from the buyer?',
    SUMMARY: {
      TITLE: 'Outstanding or overdue payments',
    },
  },
  [FAILED_PAYMENTS]: {
    LABEL: 'Has the buyer ever failed to pay you on time?',
    SUMMARY: {
      TITLE: 'Buyer failed to pay on time?',
    },
  },
  [CURRENCY_CODE]: {
    LEGEND: 'What currency are the outstanding or overdue payments in?',
  },
  [HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]: {
    LABEL: 'Have you in the past held credit insurance cover on the buyer?',
    SUMMARY: {
      TITLE: 'Credit insurance previously held for the buyer',
    },
  },
  [PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]: {
    LABEL: 'Tell us about the credit insurance cover you had on the buyer',
    HINT: 'Include the name of the insurer(s) and the credit limit.',
    SUMMARY: {
      TITLE: 'Details of credit insurance',
    },
    MAXIMUM: MAXIMUM_CHARACTERS.BUYER.PREVIOUS_CREDIT_INSURANCE_COVER,
  },
  [TOTAL_OUTSTANDING_PAYMENTS]: {
    HEADING: 'Tell us about the outstanding or overdue payments',
    LABEL: 'Total outstanding, including overdue',
    SUMMARY: {
      TITLE: 'Total outstanding including overdue',
    },
  },
  [TOTAL_AMOUNT_OVERDUE]: {
    LABEL: 'Amount overdue',
    SUMMARY: {
      TITLE: 'Amount overdue',
    },
  },
  [HAS_BUYER_FINANCIAL_ACCOUNTS]: {
    SUMMARY: {
      TITLE: 'Financial accounts relating to the buyer',
    },
  },
};
