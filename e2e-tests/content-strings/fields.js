const FIELD_IDS = require('../constants/field-ids');
const FIELD_VALUES = require('../constants/field-values');

const FIELDS = {
  [FIELD_IDS.COUNTRY]: {
    TITLE: 'Company',
    HINT: 'Some countries are not covered by UK Export Finance. If your chosen destination is not in the list, then we cannot provide cover for it.',
  },
  [FIELD_IDS.VALID_COMPANY_BASE]: {
    TITLE: 'Company',
  },
  [FIELD_IDS.VALID_BUYER_BASE]: {
    TITLE: 'Buyer location',
  },
  [FIELD_IDS.TRIED_PRIVATE_COVER]: {
    TITLE: 'Private insurance',
  },
  [FIELD_IDS.FINAL_DESTINATION]: {
    TITLE: 'Export destination',
  },
  [FIELD_IDS.UK_CONTENT_PERCENTAGE]: {
    TITLE: 'UK Content',
    LABEL: 'Percentage of your export that is UK content',
    HINT: 'Enter the UK content of your export as a percentage.',
  },
  [FIELD_IDS.CREDIT_LIMIT_GROUP]: {
    HEADING: 'What credit limit do you need?',
    HINT: 'Enter the currency and credit limit required for this export.',
  },
  [FIELD_IDS.CREDIT_LIMIT_CURRENCY]: {
    TITLE: 'Credit limit currency',
    LABEL: 'Credit limit currency',
  },
  [FIELD_IDS.CREDIT_LIMIT]: {
    TITLE: 'Credit limit',
    LABEL: 'Credit limit',
  },
  [FIELD_IDS.PRE_CREDIT_PERIOD]: {
    TITLE: 'Pre-credit period',
    LABEL: 'What pre-credit period do you need? (optional)',
    HINT: 'The pre-credit period is the number of days that you require cover for costs incurred under your export contract, before the goods or services are supplied to your buyer.',
  },
  [FIELD_IDS.CREDIT_PERIOD]: {
    TITLE: 'Credit period',
    LABEL: 'What credit period do you need?',
    HINT: 'The credit period is the number of days that your customer is allowed to wait before paying their invoice.',
  },
  [FIELD_IDS.POLICY_LENGTH]: {
    TITLE: 'Policy length',
    LABEL: 'How long do you need the policy for?',
    HINT: 'Enter the required policy length in months.',
  },
  [FIELD_IDS.POLICY_TYPE]: {
    TITLE: 'Policy type',
    LABEL: 'What kind of policy do you need?',
    HINT: 'If known, select the type of policy you need.',
    OPTIONS: {
      SINGLE: {
        VALUE: FIELD_VALUES.POLICY_TYPE.SINGLE,
        TEXT: 'Single policy',
        HINT: 'Single policies offer cover for a single export contract with a specific buyer for a pre-determined value.',
      },
      MULTI: {
        VALUE: FIELD_VALUES.POLICY_TYPE.MULTI,
        TEXT: 'Multi policy (also known as a revolving policy)',
        HINT: 'Multi policies offer cover for multiple export contracts or orders with the same buyer for up to 12 months where you are able to estimate the total value of the exports during that time.',
      },
    },
  },
};

module.exports = FIELDS;
