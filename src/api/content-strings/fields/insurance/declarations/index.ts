import { MAXIMUM_CHARACTERS } from '../../../../constants';
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
      LABEL:
        'Do you adhere to, and intend to continue to adhere to, all requirements that apply to you as set out in the Modern Slavery Act 2015, including reporting obligations, and all applicable legislation relating to the prevention of modern slavery in every country that you operate in?',
      SUMMARY: {
        TITLE: 'Adhere to the Modern Slavery Act',
      },
      CONDITIONAL_REASON: {
        LABEL:
          'If you have a turnover of more than £36 million enter full details why you cannot. Include all information relating to the type of Modern Slavery that exists or has existed, and/or any investigation or enforcement action, and any actions taken by you in connection with this.',
        MAXIMUM: MAXIMUM_CHARACTERS.DECLARATIONS.MODERN_SLAVERY.CONDITIONAL_REASON,
        SUMMARY: {
          TITLE: 'Why can the exporter not adhere?',
        },
      },
    },
    [HAS_NO_OFFENSES_OR_INVESTIGATIONS]: {
      LABEL:
        'Do you confirm you are not currently under investigation and have not been fined, convicted or found guilty of any offences under the Modern Slavery Act 2015, or under any applicable similar laws or regulations relating to the prevention of modern slavery or any similar infringement of human rights in any jurisdiction?',
      SUMMARY: {
        TITLE: 'Does the user confirm they are not under investigation or has been convicted of any human right violations',
      },
      CONDITIONAL_REASON: {
        LABEL:
          'Enter full details why you cannot. Include all information relating to the type of Modern Slavery that exists or has existed, and/or any investigation or enforcement action, and any actions taken by you in connection with this.',
        MAXIMUM: MAXIMUM_CHARACTERS.DECLARATIONS.MODERN_SLAVERY.CONDITIONAL_REASON,
        SUMMARY: {
          TITLE: 'Details of investigation for violating the Modern Slavery Act',
        },
      },
    },
    [IS_NOT_AWARE_OF_EXISTING_SLAVERY]: {
      LABEL:
        'To the best of your knowledge, can you confirm you are not aware of the existence of Modern Slavery in respect of yourself, the export contract(s), your immediate holding company or your supply chain, in each case, at present or in the past 2 years.',
      SUMMARY: {
        TITLE: 'Confirm Modern Slavery is not involved in the export',
      },
      CONDITIONAL_REASON: {
        LABEL:
          'Enter full details why you cannot. Include all information relating to the type of Modern Slavery that exists or has existed, and/or any investigation or enforcement action, and any actions taken by you in connection with this.',
        MAXIMUM: MAXIMUM_CHARACTERS.DECLARATIONS.MODERN_SLAVERY.CONDITIONAL_REASON,
        SUMMARY: {
          TITLE: 'Details of how modern slavery is involved in the export',
        },
      },
    },
  },
  [AGREE_CONFIRMATION_ACKNOWLEDGEMENTS]: {
    SUMMARY: {
      TITLE: 'Confirmation and acknowledgements',
    },
  },
};
