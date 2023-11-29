import { APPLICATION } from '../../constants/application';
import { ELIGIBILITY } from '../../constants/eligibility';
import { FIELD_IDS } from '../../constants/field-ids';
import { FIELD_VALUES } from '../../constants/field-values';
import { LINKS } from '../links';

const { MAX_COVER_PERIOD_YEARS } = ELIGIBILITY;
const {
  POLICY: { TOTAL_MONTHS_OF_COVER },
} = APPLICATION;

export const FIELDS = {
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
  [FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY]: {
    HINT: "Credit insurance protects in the event your buyer doesn't pay you. That means that cover is based on the country your buyer is based in, not the destination of the goods or services.",
    SUMMARY: {
      TITLE: 'Buyer is based in',
    },
  },
  [FIELD_IDS.ELIGIBILITY.VALID_EXPORTER_LOCATION]: {
    HINT: 'UKEF provides credit insurance for payments from overseas territories.',
    SUMMARY: {
      TITLE: 'Your company',
    },
  },
  [FIELD_IDS.ELIGIBILITY.HAS_MINIMUM_UK_GOODS_OR_SERVICES]: {
    HINT: 'You can include your profit margin as part of the contract value.',
    SUMMARY: {
      TITLE: 'UK goods or services',
    },
  },
  [FIELD_IDS.ELIGIBILITY.AMOUNT_CURRENCY]: {
    SINGLE_POLICY: {
      LEGEND: 'What\'s the total value of the contract you want to insure?',
    },
    MULTIPLE_POLICY: {
      LEGEND: 'What\'s the maximum amount your buyer will owe you at any single point during the policy?',
    },
  },
  [FIELD_IDS.ELIGIBILITY.CURRENCY]: {
    LABEL: 'Select a currency (pounds sterling, euros or US dollars). You can send out your invoices in most currencies but UKEF only issues policies in these 3 currencies.',
  },
  [FIELD_IDS.ELIGIBILITY.CONTRACT_VALUE]: {
    LABEL: 'Contract value',
    HINT: 'Enter a whole number - do not enter decimals.',
    SUMMARY: {
      TITLE: 'Total value of contract',
    },
  },
  [FIELD_IDS.ELIGIBILITY.MAX_AMOUNT_OWED]: {
    LABEL: 'Maximum amount owed at any single point',
    HINT: 'Enter a whole number - do not enter decimals.',
    SUMMARY: {
      TITLE: 'Maximum buyer will owe at any single point',
    },
  },
  [FIELD_IDS.ELIGIBILITY.CREDIT_PERIOD]: {
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
  [FIELD_IDS.ELIGIBILITY.PERCENTAGE_OF_COVER]: {
    SINGLE_POLICY: {
      LABEL: 'What percentage of your export contract value do you want to cover?',
    },
    MULTIPLE_POLICY: {
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
        HINT: [
          'Covers a single contract with a buyer, for one or more shipments',
          `Cover for up to ${MAX_COVER_PERIOD_YEARS} years`,
          'Best for a one off- project, when you know the exact value of your export contract now',
          'You pay for the insurance before the policy starts',
        ],
      },
      MULTIPLE: {
        ID: FIELD_IDS.MULTIPLE_POLICY_TYPE,
        VALUE: FIELD_VALUES.POLICY_TYPE.MULTIPLE,
        TEXT: 'Multiple contract policy',
        HINT: [
          `Covers multiple contracts with the same buyer, usually for ${TOTAL_MONTHS_OF_COVER} months`,
          "Best if you'll have an ongoing relationship with the buyer but you're not sure yet how many contracts or sales you'll have",
          'You only pay for your insurance each time you declare a new contract or sale - no need to pay before the policy starts',
        ],
        INSET: [
          [
            {
              text: `If you need a policy of over ${TOTAL_MONTHS_OF_COVER} months`,
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
  [FIELD_IDS.POLICY_LENGTH]: {
    LABEL: 'How long do you need the policy for?',
    HINT: 'You can get an online quote for up to 22 months.',
    SUMMARY: {
      TITLE: 'Policy length',
    },
  },
  [FIELD_IDS.INSURANCE.ELIGIBILITY.HAVE_AN_ACCOUNT]: {
    HINT: "If you've applied for credit insurance using this service in the past, you should have an account with us.",
  },
  [FIELD_IDS.INSURANCE.COMPANIES_HOUSE.COMPANY_NUMBER]: {
    SUMMARY: {
      TITLE: 'Companies House registration number',
    },
  },
  [FIELD_IDS.INSURANCE.COMPANIES_HOUSE.COMPANY_NAME]: {
    SUMMARY: {
      TITLE: 'Company name',
    },
  },
  [FIELD_IDS.INSURANCE.COMPANIES_HOUSE.COMPANY_ADDRESS]: {
    SUMMARY: {
      TITLE: 'Registered office address',
    },
  },
  [FIELD_IDS.INSURANCE.COMPANIES_HOUSE.COMPANY_INCORPORATED]: {
    SUMMARY: {
      TITLE: 'Incorporated on',
    },
  },
  [FIELD_IDS.INSURANCE.COMPANIES_HOUSE.COMPANY_SIC]: {
    SUMMARY: {
      TITLE: 'Standard industrial classification (SIC) codes and nature of business',
    },
  },
  [FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.YOUR_COMPANY.PHONE_NUMBER]: {
    LABEL: 'Your UK telephone number (optional)',
    HINT: 'We may need to contact you about your application',
  },
  [FIELD_IDS.FEEDBACK.SATISFACTION]: {
    TITLE: 'Satisfaction survey',
    LABEL: 'Overall, how did you feel about the service you received today?',
    VERY_SATISFIED: 'Very satisfied',
    SATISFIED: 'Satisfied',
    NEITHER: 'Neither satisfied or dissatisfied',
    DISSATISFIED: 'Dissatisfied',
    VERY_DISSATISIFED: 'Very dissatisfied',
  },
  [FIELD_IDS.FEEDBACK.IMPROVEMENT]: {
    LABEL: 'How could we improve this service?',
    HINT: 'Do not include any personal or financial information, for example your National Insurance or credit card numbers',
  },
  [FIELD_IDS.FEEDBACK.OTHER_COMMENTS]: {
    LABEL: 'Is there anything else you would like to tell us about your experience?',
    HINT: 'Do not include any personal or financial information, for example your National Insurance or credit card numbers',
  },
};
