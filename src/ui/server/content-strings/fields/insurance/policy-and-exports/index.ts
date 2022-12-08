import { FIELD_IDS, FIELD_VALUES } from '../../../../constants';

const { POLICY_AND_EXPORTS } = FIELD_IDS.INSURANCE;

export const FIELDS = {
  [POLICY_AND_EXPORTS.POLICY_TYPE]: {
    ID: FIELD_IDS.POLICY_TYPE,
    OPTIONS: {
      SINGLE: {
        ID: POLICY_AND_EXPORTS.SINGLE_POLICY_TYPE,
        VALUE: FIELD_VALUES.POLICY_TYPE.SINGLE,
        TEXT: 'Single contract policy',
        HINT_LIST: [
          'Covers a single contract with a buyer, for one or more shipments',
          'Cover for up to 2 years',
          'Best for a one off- project, when you know the exact value of your export contract now',
          'You pay for the insurance before the policy starts',
        ],
      },
      MULTI: {
        ID: POLICY_AND_EXPORTS.MULTI_POLICY_TYPE,
        VALUE: FIELD_VALUES.POLICY_TYPE.MULTI,
        TEXT: 'Multiple contract policy',
        HINT_LIST: [
          'Covers multiple contracts with the same buyer, usually for 12 months',
          "Best if you'll have an ongoing relationship with the buyer but you're not sure yet how many contracts or sales you'll have",
          'You only pay for your insurance each time you declare a new contract or sale - no need to pay before the policy starts',
        ],
      },
    },
  },
};
