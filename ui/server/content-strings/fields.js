const FIELD_IDS = require('../constants/field-ids');
const FIELD_VALUES = require('../constants/field-values');

const FIELDS = {
  [FIELD_IDS.COUNTRY]: {
    HINT: 'Some countries are not covered by UK Export Finance. If your chosen destination is not in the list, then we cannot provide cover for it.',
    SUMMARY: {
      TITLE: 'Your company',
    },
  },
  [FIELD_IDS.VALID_COMPANY_BASE]: {
    SUMMARY: {
      TITLE: 'Your company',
    },
  },
  [FIELD_IDS.BUYER_COUNTRY]: {
    SUMMARY: {
      TITLE: 'Buyer is based',
    },
  },
  [FIELD_IDS.TRIED_PRIVATE_COVER]: {
    OPTIONS: {
      YES: {
        ID: FIELD_IDS.TRIED_PRIVATE_COVER_YES,
        VALUE: FIELD_VALUES.TRIED_PRIVATE_COVER.YES,
        TEXT: 'Yes',
      },
      NO: {
        ID: FIELD_IDS.TRIED_PRIVATE_COVER_NO,
        VALUE: FIELD_VALUES.TRIED_PRIVATE_COVER.NO,
        TEXT: 'No',
      },
    },
    SUMMARY: {
      TITLE: 'Unable to get private insurance?',
    },
  },
  [FIELD_IDS.TRIED_PRIVATE_COVER_YES]: {
    SUMMARY: {
      TITLE: 'Unable to get private insurance?',
    },
  },
  [FIELD_IDS.TRIED_PRIVATE_COVER_NO]: {
    SUMMARY: {
      TITLE: 'Unable to get private insurance?',
    },
  },
  [FIELD_IDS.UK_CONTENT_PERCENTAGE]: {
    LABEL: 'Percentage of your export that is UK content',
    HINT: 'Enter the UK content of your export as a percentage.',
    SUMMARY: {
      TITLE: 'UK goods or services in export',
    },
  },
  [FIELD_IDS.AMOUNT_CURRENCY]: {
    LEGEND: 'What\'s the maximum amount excluding VAT your buyer will owe you at any single point during the export contract?',
  },
  [FIELD_IDS.CURRENCY]: {
    LABEL: 'Select the currency your buyer will pay you in.',
    SUMMARY: {
      TITLE: 'Currency buyer will pay in',
    },
  },
  [FIELD_IDS.AMOUNT]: {
    LABEL: 'Amount',
    HINT: 'The amount your buyer owes will probably rise and fall during the export contract. You only need to enter the highest amount it\'ll be at any single point.',
    SUMMARY: {
      TITLE: 'Maximum amount owed',
    },
  },
  [FIELD_IDS.CREDIT_PERIOD]: {
    LABEL: 'What credit period do you have with your buyer?',
    HINT: 'For example, they may have 30, 60 or 90 days to pay you.',
    SUMMARY: {
      TITLE: 'Days credit extended to buyer',
    },
  },
  [FIELD_IDS.POLICY_TYPE]: {
    LEGEND: 'What kind of policy do you need?',
    OPTIONS: {
      SINGLE: {
        ID: FIELD_IDS.SINGLE_POLICY_TYPE,
        VALUE: FIELD_VALUES.POLICY_TYPE.SINGLE,
        TEXT: 'Single contract policy',
        HINT: 'This covers a single export contract with a specific buyer with one or more shipments.',
      },
      MULTI: {
        ID: FIELD_IDS.MULTI_POLICY_TYPE,
        VALUE: FIELD_VALUES.POLICY_TYPE.MULTI,
        TEXT: 'Multiple contract policy (also known as a revolving policy)',
        HINT: 'This covers multiple export contracts or orders with the same buyer. You\'ll need to be able to estimate the total value of the exports during the policy.',
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
    HINT: 'Calculate this from the date your export is delivered to your buyer. Do not include any shipping period, as UKEF cannot insure this.',
    SUMMARY: {
      TITLE: 'Main policy length',
    },
  },
  [FIELD_IDS.MULTI_POLICY_LENGTH]: {
    LABEL: 'How long do you need the policy for?',
    HINT: 'Enter policy length in months. The maximum is 12 months.',
    SUMMARY: {
      TITLE: 'Main policy length',
    },
  },
};

module.exports = FIELDS;
