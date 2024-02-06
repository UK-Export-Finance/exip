import { FIELD_IDS } from '../../../../constants';

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
      LABEL: 'Address',
      MAXIMUM: 300,
      SUMMARY: {
        TITLE: 'Buyer address',
      },
    },
    [COMPANY_OR_ORGANISATION.COUNTRY]: {
      LABEL: 'Buyer country',
    },
    [COMPANY_OR_ORGANISATION.REGISTRATION_NUMBER]: {
      LABEL: 'Registration number (optional)',
      SUMMARY: {
        TITLE: 'Registration number (optional)',
      },
    },
    [COMPANY_OR_ORGANISATION.WEBSITE]: {
      LABEL: 'Enter their  website (optional)',
      SUMMARY: {
        TITLE: 'Buyer website (optional)',
      },
    },
    [COMPANY_OR_ORGANISATION.FIRST_NAME]: {
      LEGEND: "Enter details for your contact at the buyer's company or organisation",
      HINT: 'We will not contact them without your permission',
      LABEL: 'First name',
      SUMMARY: {
        TITLE: 'Contact details',
      },
    },
    [COMPANY_OR_ORGANISATION.LAST_NAME]: {
      LABEL: 'Last name',
    },
    [COMPANY_OR_ORGANISATION.POSITION]: {
      LABEL: 'Position',
    },
    [COMPANY_OR_ORGANISATION.EMAIL]: {
      LABEL: 'Email address',
    },
    [COMPANY_OR_ORGANISATION.CAN_CONTACT_BUYER]: {
      LABEL: 'Can we contact the buyer about this application, if we need to?',
      HINT: 'For example, if we need to contact them for their accounts.',
      SUMMARY: {
        TITLE: 'Can we contact the buyer?',
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
  },
  [FAILED_PAYMENTS]: {
    LABEL: 'Has the buyer ever failed to pay you on time?',
  },
  [CURRENCY_CODE]: {
    LEGEND: 'What currency are the outstanding or overdue payments in?',
  },
  [HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]: {
    LABEL: 'Have you in the past held credit insurance cover on the buyer?',
  },
  [PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]: {
    LABEL: 'Tell us about the credit insurance cover you had on the buyer',
    HINT: 'Include the name of the insurer(s) and the credit limit.',
    MAXIMUM: 1000,
  },
  [TOTAL_OUTSTANDING_PAYMENTS]: {
    HEADING: 'Tell us about the outstanding or overdue payments',
    LABEL: 'Total outstanding, including overdue',
  },
  [TOTAL_AMOUNT_OVERDUE]: {
    LABEL: 'Amount overdue',
  },
};
