import { FIELD_IDS, FIELD_VALUES } from '../../../../constants';
import { LINKS } from '../../../links';

const { POLICY_AND_EXPORTS } = FIELD_IDS.INSURANCE;
const { CONTRACT_POLICY } = POLICY_AND_EXPORTS;

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
  CONTRACT_POLICY: {
    [CONTRACT_POLICY.REQUESTED_START_DATE]: {
      LABEL: 'When do you want your policy to start?',
      HINT: 'For example, 6 11 2023',
    },
    [CONTRACT_POLICY.CREDIT_PERIOD_WITH_BUYER]: {
      LABEL: 'What credit period do you have with your buyer?',
      HINT: 'For example, 60 days after dispatching goods from your premises or 90 days after invoicing.',
      MAXIMUM: 1000,
    },
    [CONTRACT_POLICY.POLICY_CURRENCY_CODE]: {
      LABEL: "Select currency you'd like your policy to be issued in",
      HINT: [
        {
          text: "UKEF usually issues policies in pounds sterling, US dollars or euros. If you need a different currency, you'll need to ",
        },
        {
          text: 'apply using our form.',
          href: LINKS.EXTERNAL.NBI_FORM,
        },
      ],
    },
    SINGLE: {
      [CONTRACT_POLICY.SINGLE.CONTRACT_COMPLETION_DATE]: {
        LABEL: 'When do you expect to complete the export contract?',
        HINT: 'For example, 6 11 2024',
      },
      [CONTRACT_POLICY.SINGLE.TOTAL_CONTRACT_VALUE]: {
        LABEL: "What's the total value of the contract you want to insure?",
        HINT: 'Enter a whole number - do not enter decimals.',
      },
    },
    MULTI: {},
  },
};
