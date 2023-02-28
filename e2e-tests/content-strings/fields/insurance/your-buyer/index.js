import { FIELD_IDS } from '../../../../constants';

const {
  YOUR_BUYER: { COMPANY_OR_ORGANISATION },
} = FIELD_IDS.INSURANCE;

export const YOUR_BUYER_FIELDS = {
  COMPANY_OR_ORGANISATION: {
    [COMPANY_OR_ORGANISATION.NAME]: {
      LABEL: "Buyer's company or organisation name",
    },
    [COMPANY_OR_ORGANISATION.ADDRESS]: {
      LABEL: 'Address',
      MAXIMUM: 330,
    },
    [COMPANY_OR_ORGANISATION.COUNTRY]: {
      LABEL: 'Country',
    },
    [COMPANY_OR_ORGANISATION.REGISTRATION_NUMBER]: {
      LABEL: 'Registration number (optional)',
    },
    [COMPANY_OR_ORGANISATION.WEBSITE]: {
      LABEL: 'Enter their  website (optional)',
    },
    [COMPANY_OR_ORGANISATION.FIRST_NAME]: {
      HEADING: "Enter details for your contact at the buyer's company or organisation",
      HINT: 'We will not contact them without your permission',
      LABEL: 'First name',
    },
    [COMPANY_OR_ORGANISATION.LAST_NAME]: {
      LABEL: 'Last name',
    },
  },
};
