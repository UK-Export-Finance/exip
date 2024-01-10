import {
  APPLICATION,
  ELIGIBILITY,
  FIELD_IDS,
  FIELD_VALUES,
} from '../../../../constants';
import { FORM_TITLES } from '../../../form-titles';

const { POLICY, ACCOUNT } = FIELD_IDS.INSURANCE;

const {
  BROKER, CONTRACT_POLICY, EXPORT_VALUE, NAME_ON_POLICY, DIFFERENT_NAME_ON_POLICY, NEED_PRE_CREDIT_PERIOD, PRE_CREDIT_PERIOD_DESCRIPTION,
} = POLICY;

const { EMAIL } = ACCOUNT;

const { MAX_COVER_PERIOD_MONTHS } = ELIGIBILITY;

const {
  POLICY: { TOTAL_MONTHS_OF_COVER },
} = APPLICATION;

const {
  POLICY: POLICY_FORM_TITLES,
} = FORM_TITLES;

export const POLICY_FIELDS = {
  [POLICY.POLICY_TYPE]: {
    ID: FIELD_IDS.POLICY_TYPE,
    OPTIONS: {
      SINGLE: {
        ID: POLICY.SINGLE_POLICY_TYPE,
        VALUE: FIELD_VALUES.POLICY_TYPE.SINGLE,
        TEXT: 'Single contract policy',
        HINT_LIST: [
          'Covers a single contract with a buyer, for one or more shipments',
          `Cover for up to ${MAX_COVER_PERIOD_MONTHS} months`,
          'Best for a one off- project, when you know the exact value of your export contract now',
          'You pay for the insurance before the policy starts',
        ],
      },
      MULTIPLE: {
        ID: POLICY.MULTIPLE_POLICY_TYPE,
        VALUE: FIELD_VALUES.POLICY_TYPE.MULTIPLE,
        TEXT: 'Multiple contract policy',
        HINT_LIST: [
          'Covers multiple contracts with the same buyer, usually for 12 months',
          "Best if you'll have an ongoing relationship with the buyer but you're not sure yet how many contracts or sales you'll have",
          'You only pay for your insurance each time you declare a new contract or sale - no need to pay before the policy starts',
        ],
      },
    },
    SUMMARY: {
      TITLE: 'Policy type',
      FORM_TITLE: POLICY_FORM_TITLES.CONTRACT_POLICY,
    },
  },
  CONTRACT_POLICY: {
    [CONTRACT_POLICY.REQUESTED_START_DATE]: {
      LABEL: 'When do you want your policy to start?',
      HINT: 'For example, 06 11 2023',
      SUMMARY: {
        TITLE: 'Policy start date',
        FORM_TITLE: POLICY_FORM_TITLES.CONTRACT_POLICY,
      },
    },
    [CONTRACT_POLICY.POLICY_CURRENCY_CODE]: {
      LEGEND: "Select currency you'd like your policy to be issued in",
      SUMMARY: {
        TITLE: 'Policy currency',
        FORM_TITLE: POLICY_FORM_TITLES.CONTRACT_POLICY,
      },
      [CONTRACT_POLICY.ALTERNATIVE_POLICY_CURRENCY_CODE]: {
        TEXT: 'Another currency',
        ID: CONTRACT_POLICY.ALTERNATIVE_POLICY_CURRENCY_CODE,
        VALUE: CONTRACT_POLICY.ALTERNATIVE_POLICY_CURRENCY_CODE,
      },
    },
    SINGLE: {
      [CONTRACT_POLICY.SINGLE.CONTRACT_COMPLETION_DATE]: {
        LABEL: 'When do you expect to complete the export contract?',
        HINT: 'For example, 06 11 2024',
        SUMMARY: {
          TITLE: 'Date you expect it to complete',
          FORM_TITLE: POLICY_FORM_TITLES.CONTRACT_POLICY,
        },
      },
    },
    MULTIPLE: {
      [CONTRACT_POLICY.MULTIPLE.TOTAL_MONTHS_OF_COVER]: {
        LABEL: 'How many months do you want to be insured for?',
        HINT: `The maximum is ${TOTAL_MONTHS_OF_COVER} months.`,
        OPTIONS: FIELD_VALUES.TOTAL_MONTHS_OF_COVER,
        SUMMARY: {
          TITLE: 'How many months you want to be insured for',
          FORM_TITLE: POLICY_FORM_TITLES.CONTRACT_POLICY,
        },
      },
    },
  },
  EXPORT_VALUE: {
    SINGLE: {
      [EXPORT_VALUE.SINGLE.TOTAL_CONTRACT_VALUE]: {
        LABEL: "What's the total value of the contract you want to insure?",
        HINT: 'Enter a whole number - do not enter decimals.',
        SUMMARY: {
          TITLE: 'Contract value',
          FORM_TITLE: POLICY_FORM_TITLES.CONTRACT_POLICY,
        },
      },
    },
    MULTIPLE: {
      [EXPORT_VALUE.MULTIPLE.TOTAL_SALES_TO_BUYER]: {
        LABEL: 'Estimate total sales to your buyer during this time',
        HINT: 'Enter a whole number - do not enter decimals.',
        SUMMARY: {
          TITLE: 'Estimated total sales to the buyer',
          FORM_TITLE: POLICY_FORM_TITLES.CONTRACT_POLICY,
        },
      },
      [EXPORT_VALUE.MULTIPLE.MAXIMUM_BUYER_WILL_OWE]: {
        LABEL: 'Estimate the maximum amount your buyer will owe you at any single point during this time',
        HINT: {
          FOR_EXAMPLE: 'For example, your total sales might be £250,000 but the maximum the buyer will owe you at any single point is £100,000.',
          NO_DECIMALS: 'Enter a whole number - do not enter decimals.',
        },
        SUMMARY: {
          TITLE: 'Estimated maximum amount owed by the buyer',
          FORM_TITLE: POLICY_FORM_TITLES.CONTRACT_POLICY,
        },
      },
    },
  },
  NAME_ON_POLICY: {
    OPTIONS: {
      SAME_NAME: {
        ID: NAME_ON_POLICY.SAME_NAME,
        VALUE: NAME_ON_POLICY.SAME_NAME,
      },
      OTHER_NAME: {
        ID: NAME_ON_POLICY.OTHER_NAME,
        VALUE: NAME_ON_POLICY.OTHER_NAME,
        TEXT: 'Someone else',
      },
    },
    [NAME_ON_POLICY.POSITION]: {
      LABEL: "What's your position at the company?",
      SUMMARY: {
        TITLE: 'Position at company',
        FORM_TITLE: POLICY_FORM_TITLES.NAME_ON_POLICY,
      },
    },
    [NAME_ON_POLICY.NAME]: {
      SUMMARY: {
        TITLE: 'Contact name',
        FORM_TITLE: POLICY_FORM_TITLES.NAME_ON_POLICY,
      },
    },
  },
  DIFFERENT_NAME_ON_POLICY: {
    [DIFFERENT_NAME_ON_POLICY.POSITION]: {
      LABEL: 'Position at company',
    },
    [EMAIL]: {
      SUMMARY: {
        TITLE: 'Contact email',
        FORM_TITLE: POLICY_FORM_TITLES.NAME_ON_POLICY,
      },
    },
  },
  [NEED_PRE_CREDIT_PERIOD]: {
    HINT: 'This is known as the pre-credit period',
    SUMMARY: {
      TITLE: 'Pre-credit period',
    },
  },
  [PRE_CREDIT_PERIOD_DESCRIPTION]: {
    LABEL: 'What period of pre-credit cover do you require?',
    MAXIMUM: 1000,
    SUMMARY: {
      TITLE: 'Period of pre-credit cover',
    },
  },
  BROKER: {
    [BROKER.LEGEND]: {
      LEGEND: 'Enter contact details for your broker',
    },
    [BROKER.USING_BROKER]: {
      SUMMARY: {
        TITLE: 'Using a broker',
        FORM_TITLE: POLICY_FORM_TITLES.BROKER,
      },
    },
    [BROKER.NAME]: {
      LABEL: 'Name of broker or company',
      SUMMARY: {
        TITLE: "Broker's name or company",
        FORM_TITLE: POLICY_FORM_TITLES.BROKER,
      },
    },
    [BROKER.ADDRESS_LINE_1]: {
      LABEL: 'Address line 1',
      SUMMARY: {
        TITLE: "Broker's address",
        FORM_TITLE: POLICY_FORM_TITLES.BROKER,
      },
    },
    [BROKER.ADDRESS_LINE_2]: {
      LABEL: 'Address line 2 (optional)',
    },
    [BROKER.TOWN]: {
      LABEL: 'Town or city',
    },
    [BROKER.COUNTY]: {
      LABEL: 'County (optional)',
    },
    [BROKER.POSTCODE]: {
      LABEL: 'Postcode',
    },
    [BROKER.EMAIL]: {
      LABEL: 'Email address',
      SUMMARY: {
        TITLE: "Broker's email",
        FORM_TITLE: POLICY_FORM_TITLES.BROKER,
      },
    },
    [BROKER.DETAILS]: {
      SUMMARY: 'Why appoint a broker?',
      LINE_1: 'A broker can advise you during the application process and lifetime of any UKEF insurance policy.',
      LINE_2: "You can find your nearest one on UKEF's list of approved brokers.",
      LINK_TEXT: "UKEF's list of approved brokers.",
      LINE_3: 'Alternatively, you can use any broker you prefer. They do not have to be approved by UKEF.',
      LINE_4: 'Appointing a broker does not change the cost to you of any UKEF credit insurance policy.',
    },
  },
};
