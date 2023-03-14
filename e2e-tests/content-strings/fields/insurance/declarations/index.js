import { FIELD_IDS } from '../../../../constants';

const { DECLARATIONS } = FIELD_IDS.INSURANCE;

const { AGREE_CONFIDENTIALITY } = DECLARATIONS;

export const DECLARATIONS_FIELDS = {
  [AGREE_CONFIDENTIALITY]: {
    LABEL: "I've read and agree with the confidentiality declaration.",
    OPTION: {
      TEXT: 'I have read and accept the confidentiality declaration.',
      VALUE: true,
    },
  },
};
