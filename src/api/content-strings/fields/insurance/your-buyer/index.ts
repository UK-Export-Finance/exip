import FIELD_IDS from '../../../../constants/field-ids/insurance';

const {
  YOUR_BUYER: { COMPANY_OR_ORGANISATION, WORKING_WITH_BUYER },
} = FIELD_IDS;

export const YOUR_BUYER_FIELDS = {
  COMPANY_OR_ORGANISATION: {
    [COMPANY_OR_ORGANISATION.NAME]: {
      SUMMARY: {
        TITLE: 'Company or organisation name',
      },
    },
    [COMPANY_OR_ORGANISATION.ADDRESS]: {
      SUMMARY: {
        TITLE: 'Buyer address',
      },
    },
    [COMPANY_OR_ORGANISATION.COUNTRY]: {
      LABEL: 'Country',
    },
    [COMPANY_OR_ORGANISATION.REGISTRATION_NUMBER]: {
      SUMMARY: {
        TITLE: 'Registration number (optional)',
      },
    },
    [COMPANY_OR_ORGANISATION.WEBSITE]: {
      SUMMARY: {
        TITLE: 'Buyer website (optional)',
      },
    },
    [COMPANY_OR_ORGANISATION.FIRST_NAME]: {
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
      SUMMARY: {
        TITLE: 'Can we contact the buyer?',
      },
    },
  },
  WORKING_WITH_BUYER: {
    [WORKING_WITH_BUYER.CONNECTION_WITH_BUYER]: {
      SUMMARY: {
        TITLE: 'Connected with the buyer in any way?',
      },
    },
    [WORKING_WITH_BUYER.TRADED_WITH_BUYER]: {
      SUMMARY: {
        TITLE: 'Have you traded with this buyer before?',
      },
    },
  },
};
