import { FIELD_IDS } from '../../../../constants';

const {
  YOUR_BUYER: { COMPANY_OR_ORGANISATION, WORKING_WITH_BUYER },
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
  WORKING_WITH_BUYER: {
    [WORKING_WITH_BUYER.CONNECTED_WITH_BUYER]: {
      LABEL: 'Are you connected with the buyer in any way?',
      HINT: "For example, someone in your company is a shareholder or director of the buyer's company.",
      SUMMARY: {
        TITLE: 'Connected with the buyer in any way?',
      },
    },
    [WORKING_WITH_BUYER.TRADED_WITH_BUYER]: {
      LABEL: 'Have you traded with this buyer before?',
      HINT: 'If yes, we will request a copy of your trading history once the application has been submitted.',
      SUMMARY: {
        TITLE: 'Have you traded with this buyer before?',
      },
    },
  },
};
