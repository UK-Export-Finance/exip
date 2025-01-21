import { MAXIMUM_CHARACTERS } from '../../../../constants';
import { DECLARATIONS as DECLARATIONS_FIELDS_IDS } from '../../../../constants/field-ids/insurance/declarations';

const {
  MODERN_SLAVERY: { WILL_ADHERE_TO_ALL_REQUIREMENTS, HAS_NO_OFFENSES_OR_INVESTIGATIONS, IS_NOT_AWARE_OF_EXISTING_SLAVERY },
} = DECLARATIONS_FIELDS_IDS;

export const DECLARATIONS_FIELDS = {
  MODERN_SLAVERY: {
    [WILL_ADHERE_TO_ALL_REQUIREMENTS]: {
      VERSIONS: [
        {
          VERSION: '1',
          LABEL:
            'Do you adhere to, and intend to continue to adhere to, all requirements that apply to you as set out in the Modern Slavery Act 2015, including reporting obligations, and all applicable legislation relating to the prevention of modern slavery in every country that you operate in?',
          CONDITIONAL_REASON: {
            LABEL: 'Provide full details.',
            MAXIMUM: MAXIMUM_CHARACTERS.DECLARATIONS.MODERN_SLAVERY.CONDITIONAL_REASON,
          },
        },
      ],
    },
    [HAS_NO_OFFENSES_OR_INVESTIGATIONS]: {
      VERSIONS: [
        {
          VERSION: '1',
          LABEL:
            'Do you confirm you are not currently under investigation and have not been fined, convicted or found guilty of any offences under the Modern Slavery Act 2015, or under any applicable similar laws or regulations relating to the prevention of modern slavery or any similar infringement of human rights in any jurisdiction?',
          CONDITIONAL_REASON: {
            LABEL:
              'Provide full details. Include all information relating to the type of Modern Slavery that exists or has existed, and/or any investigation or enforcement action, and any actions taken by you in connection with this.',
            MAXIMUM: MAXIMUM_CHARACTERS.DECLARATIONS.MODERN_SLAVERY.CONDITIONAL_REASON,
          },
        },
      ],
    },
    [IS_NOT_AWARE_OF_EXISTING_SLAVERY]: {
      VERSIONS: [
        {
          VERSION: '1',
          LABEL:
            'To the best of your knowledge, can you confirm you are not aware of the existence of Modern Slavery in respect of yourself, the export contract(s), your immediate holding company or your supply chain, in each case, at present or in the past 2 years.',
          CONDITIONAL_REASON: {
            LABEL:
              'Provide full details. Include all information relating to the type of Modern Slavery that exists or has existed, and/or any investigation or enforcement action, and any actions taken by you in connection with this.',
            MAXIMUM: MAXIMUM_CHARACTERS.DECLARATIONS.MODERN_SLAVERY.CONDITIONAL_REASON,
          },
        },
      ],
    },
  },
};
