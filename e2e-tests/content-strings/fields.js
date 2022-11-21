import FIELD_IDS from '../constants/field-ids';
import FIELD_VALUES from '../constants/field-values';
import LINKS from './links';

const FIELDS = {
  [FIELD_IDS.BUYER_COUNTRY]: {
    HINT: 'Cover is based on the country your buyer is located in, not the destination of your goods or services.',
    SUMMARY: {
      TITLE: 'Buyer is based in',
    },
  },
  [FIELD_IDS.VALID_EXPORTER_LOCATION]: {
    SUMMARY: {
      TITLE: 'Your company',
    },
  },
  [FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES]: {
    HINT: 'You can include your profit margin as part of the contract value.',
    SUMMARY: {
      TITLE: 'UK goods or services',
    },
  },
  [FIELD_IDS.AMOUNT_CURRENCY]: {
    SINGLE_POLICY: {
      LEGEND: 'What\'s the total value of the contract you want to insure?',
    },
    MULTI_POLICY: {
      LEGEND: 'What\'s the maximum amount your buyer will owe you at any single point during the policy?',
    },
  },
  [FIELD_IDS.CURRENCY]: {
    LABEL: 'Select a currency (pounds sterling, euros or US dollars). You can send out your invoices in most currencies but UKEF only issues policies in these 3 currencies.',
  },
  [FIELD_IDS.CONTRACT_VALUE]: {
    LABEL: 'Contract value',
    HINT: 'Enter a whole number - do not enter decimals.',
    SUMMARY: {
      TITLE: 'Total value of contract',
    },
  },
  [FIELD_IDS.MAX_AMOUNT_OWED]: {
    LABEL: 'Maximum amount owed at any single point',
    HINT: 'Enter a whole number - do not enter decimals.',
    SUMMARY: {
      TITLE: 'Maximum buyer will owe at any single point',
    },
  },
  [FIELD_IDS.CREDIT_PERIOD]: {
    LABEL: 'What credit period do you have with your buyer?',
    HINT: [
      {
        text: 'You can get an online quote for credit periods up to 2 months.  If you need a credit period of over 2 months',
      },
      {
        text: 'fill in this form',
        href: LINKS.EXTERNAL.NBI_FORM,
      },
      {
        text: 'and email it to UKEF.',
      },
    ],
    OPTIONS: [
      {
        value: '1',
        text: '1 month',
      },
      {
        value: '2',
        text: '2 months',
      },
    ],
    SUMMARY: {
      TITLE: 'Credit period',
    },
  },
  [FIELD_IDS.PERCENTAGE_OF_COVER]: {
    SINGLE_POLICY: {
      LABEL: 'What percentage of your export contract value do you want to cover?',
    },
    MULTI_POLICY: {
      LABEL: 'What percentage of cover do you need?',
      HINT: 'Select a percentage of the maximum your buyer will owe at any single point.',
    },
    SUMMARY: {
      TITLE: 'Percentage of cover',
    },
  },
  [FIELD_IDS.POLICY_TYPE]: {
    OPTIONS: {
      SINGLE: {
        ID: FIELD_IDS.SINGLE_POLICY_TYPE,
        VALUE: FIELD_VALUES.POLICY_TYPE.SINGLE,
        TEXT: 'Single contract policy',
        HINT: 'This covers a single export contract with a single buyer for one or more shipments. You need to pay before the policy starts.',
      },
      MULTI: {
        ID: FIELD_IDS.MULTI_POLICY_TYPE,
        VALUE: FIELD_VALUES.POLICY_TYPE.MULTI,
        TEXT: 'Multiple contract policy (also known as a revolving policy)',
        HINT: "This covers multiple export contracts with the same buyer for a policy period of 12 months. You do not need to pay before the policy starts. You'll pay each time you declare a new export sale.",
        INSET: [
          [
            {
              text: 'If you need a policy of over 12 months',
            },
            {
              text: 'fill in this form',
              href: LINKS.EXTERNAL.NBI_FORM,
            },
            {
              text: ' and email it to UKEF.',
            },
          ],
        ],
      },
    },
    SUMMARY: {
      TITLE: 'Policy type',
    },
  },
  [FIELD_IDS.SINGLE_POLICY_TYPE]: {
    SUMMARY: {
      TITLE: 'Policy type',
    },
  },
  [FIELD_IDS.MULTI_POLICY_TYPE]: {
    SUMMARY: {
      TITLE: 'Policy type',
    },
  },
  [FIELD_IDS.SINGLE_POLICY_LENGTH]: {
    LABEL: 'How long do you need the policy for?',
    HINT: [
      [
        {
          text: 'You can get an online quote for up to 22 months. For over 22 months',
        },
        {
          text: 'fill in this form',
          href: LINKS.EXTERNAL.NBI_FORM,
        },
        {
          text: ' and email it to UKEF.',
        },
      ],
    ],
    SUMMARY: {
      TITLE: 'Policy length',
    },
  },
  [FIELD_IDS.MULTI_POLICY_LENGTH]: {
    SUMMARY: {
      TITLE: 'Policy length',
    },
  },
  [FIELD_IDS.OPTIONAL_COOKIES]: {
    OPTIONS: {
      ACCEPT: {
        ID: FIELD_VALUES.OPTIONAL_COOKIES.ACCEPT,
        VALUE: FIELD_VALUES.OPTIONAL_COOKIES.ACCEPT,
        TEXT: 'Use cookies that measure your use of this service',
      },
      REJECT: {
        ID: FIELD_VALUES.OPTIONAL_COOKIES.REJECT,
        VALUE: FIELD_VALUES.OPTIONAL_COOKIES.REJECT,
        TEXT: 'Do not use cookies that measure your use of this service',
      },
    },
  },
  [FIELD_IDS.INSURANCE.ELIGIBILITY.PRE_CREDIT_PERIOD]: {
    HINT: 'This is known as the pre-credit period.',
  },
};

export default FIELDS;
