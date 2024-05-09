import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';

const {
  DECLARATIONS: {
    AGREE_CONFIDENTIALITY,
    AGREE_ANTI_BRIBERY,
    HAS_ANTI_BRIBERY_CODE_OF_CONDUCT,
    AGREE_CONFIRMATION_ACKNOWLEDGEMENTS,
    AGREE_HOW_YOUR_DATA_WILL_BE_USED,
    WILL_EXPORT_WITH_CODE_OF_CONDUCT,
  },
} = INSURANCE_FIELD_IDS;

export const DECLARATIONS_FIELDS = {
  [AGREE_CONFIDENTIALITY]: {
    SUMMARY: {
      TITLE: 'Confidentiality',
    },
  },
  [AGREE_ANTI_BRIBERY]: {
    SUMMARY: {
      TITLE: 'Anti-bribery and corruption',
    },
  },
  [HAS_ANTI_BRIBERY_CODE_OF_CONDUCT]: {
    SUMMARY: {
      TITLE: 'Do you have a code of conduct?',
    },
  },
  [WILL_EXPORT_WITH_CODE_OF_CONDUCT]: {
    SUMMARY: {
      TITLE: 'Will you export using your code of conduct?',
    },
  },
  [AGREE_CONFIRMATION_ACKNOWLEDGEMENTS]: {
    SUMMARY: {
      TITLE: 'Confirmation and acknowledgements',
    },
  },
  [AGREE_HOW_YOUR_DATA_WILL_BE_USED]: {
    SUMMARY: {
      TITLE: 'How your data will be used',
    },
  },
};
