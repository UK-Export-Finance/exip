import { FIELD_IDS } from '../../../../constants';

const { DECLARATIONS } = FIELD_IDS.INSURANCE;

const { AGREE_CONFIDENTIALITY, AGREE_ANTI_BRIBERY } = DECLARATIONS;

const CONFIRM_READ_AND_AGREE = "Confirm you've read and agree with the ";

const HAVE_READ_AND_AREED = "I've read and agree with the ";

export const DECLARATIONS_FIELDS = {
  [AGREE_CONFIDENTIALITY]: {
    LABEL: `${CONFIRM_READ_AND_AGREE} confidentiality declaration`,
    OPTION: {
      TEXT: `${HAVE_READ_AND_AREED} confidentiality declaration`,
      VALUE: true,
    },
  },
  [AGREE_ANTI_BRIBERY]: {
    LABEL: `${CONFIRM_READ_AND_AGREE} anti-bribery and corruption declaration`,
    OPTION: {
      TEXT: `${HAVE_READ_AND_AREED} anti-bribery and corruption declaration`,
      VALUE: true,
    },
  },
};
