import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';

const {
  DECLARATIONS: {
    AGREE_CONFIDENTIALITY,
    AGREE_ANTI_BRIBERY,
    HAS_ANTI_BRIBERY_CODE_OF_CONDUCT,
    AGREE_CONFIRMATION_ACKNOWLEDGEMENTS,
    MODERN_SLAVERY: { WILL_ADHERE_TO_ALL_REQUIREMENTS, HAS_NO_OFFENSES_OR_INVESTIGATIONS, IS_NOT_AWARE_OF_EXISTING_SLAVERY },
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
  MODERN_SLAVERY: {
    [WILL_ADHERE_TO_ALL_REQUIREMENTS]: {
      VERSIONS: [
        {
          VERSION: '1',
          LABEL:
            'Do you adhere to, and intend to continue to adhere to, all requirements that apply to you as set out in the Modern Slavery Act 2015, including reporting obligations, and all applicable legislation relating to the prevention of modern slavery in every country that you operate in?',
        },
      ],
    },
    [HAS_NO_OFFENSES_OR_INVESTIGATIONS]: {
      VERSIONS: [
        {
          VERSION: '1',
          LABEL:
            'Do you confirm you are not currently under investigation and have not been fined, convicted or found guilty of any offences under the Modern Slavery Act 2015, or under any applicable similar laws or regulations relating to the prevention of modern slavery or any similar infringement of human rights in any jurisdiction?',
        },
      ],
    },
    [IS_NOT_AWARE_OF_EXISTING_SLAVERY]: {
      VERSIONS: [
        {
          VERSION: '1',
          LABEL:
            'To the best of your knowledge, can you confirm you are not aware of the existence of Modern Slavery in respect of yourself, the export contract (s), your immediate holding company or your supply chain, in each case, at present or in the past 2 years.',
        },
      ],
    },
  },
  [AGREE_CONFIRMATION_ACKNOWLEDGEMENTS]: {
    SUMMARY: {
      TITLE: 'Confirmation and acknowledgements',
    },
  },
};
