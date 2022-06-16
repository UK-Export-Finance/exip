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
  [FIELD_IDS.VALID_BUYER_BASE]: {
    SUMMARY: {
      TITLE: 'Buyer is based',
    },
  },
  [FIELD_IDS.TRIED_PRIVATE_COVER]: {
    OPTIONS: {
      YES: {
        VALUE: FIELD_VALUES.TRIED_PRIVATE_COVER.YES,
        TEXT: 'Yes, I\'ve been turned down',
      },
      NO: {
        VALUE: FIELD_VALUES.TRIED_PRIVATE_COVER.NO,
        TEXT: 'No, I\'ve been offered private insurance',
      },
      NOT_TRIED: {
        VALUE: FIELD_VALUES.TRIED_PRIVATE_COVER.NOT_TRIED,
        TEXT: 'I\'ve not tried',
      },
    },
    SUMMARY: {
      TITLE: 'Unable to get private insurance?',
    },
  },
  [FIELD_IDS.FINAL_DESTINATION]: {
    TITLE: 'Export destination',
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
    HINT: 'The amount your buyer owes will probably rise and fall during the export contract. You only need to tell us the highest amount it’ll be at any single point.',
    SUMMARY: {
      TITLE: 'Maximum amount owed',
    },
  },
  [FIELD_IDS.PRE_CREDIT_PERIOD]: {
    LEGEND: 'Enter any pre-credit period cover you need (optional)',
    LABEL: 'Pre-credit period',
    HINT: 'A pre-credit period insures you for costs you\'ll incur in this export contract before you supply goods or services to your buyer.',
    SUMMARY: {
      TITLE: 'Pre-credit period',
    },
  },
  [FIELD_IDS.CREDIT_PERIOD]: {
    LABEL: 'How many days credit do you extend to your buyer?',
    HINT: 'For example, they may have 30, 60 or 90 days to pay you.',
    SUMMARY: {
      TITLE: 'Days credit extended to buyer',
    },
  },
  [FIELD_IDS.POLICY_TYPE]: {
    LEGEND: 'What kind of policy do you need?',
    OPTIONS: {
      SINGLE: {
        VALUE: FIELD_VALUES.POLICY_TYPE.SINGLE,
        TEXT: 'Single policy',
        HINT: 'This offers cover for a single export contract with a specific buyer for a pre-determined amount.',
      },
      MULTI: {
        VALUE: FIELD_VALUES.POLICY_TYPE.MULTI,
        TEXT: 'Multi policy (also known as a revolving policy)',
        HINT: 'Multi policies offer cover for multiple export contracts or orders with the same buyer for up to 12 months. You’ll need to be able to estimate the total value of the exports during that time.',
      },
    },
    SUMMARY: {
      TITLE: 'Policy type',
    },
  },
  [FIELD_IDS.SINGLE_POLICY_LENGTH]: {
    LABEL: 'How long do you need the policy for?',
    HINT: 'Enter policy length in months. The maximum is 24 months.',
  },
  [FIELD_IDS.MULTI_POLICY_LENGTH]: {
    LABEL: 'How long do you need the policy for?',
    HINT: 'Enter policy length in months. The maximum is 12 months.',
  },
  [FIELD_IDS.POLICY_LENGTH]: {
    LABEL: 'How long do you need the policy for?',
    HINT: 'Enter policy length in months. The maximum is 24 months.',
    SUMMARY: {
      TITLE: 'Policy length',
    },
  },
};

module.exports = FIELDS;
