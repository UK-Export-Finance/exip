import { APPLICATION, ELIGIBILITY, FIELD_VALUES, MAXIMUM_CHARACTERS } from '../../../../constants';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { FORM_TITLES } from '../../../form-titles';

const {
  ACCOUNT: { EMAIL },
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
  POLICY: {
    POLICY_TYPE,
    SINGLE_POLICY_TYPE,
    MULTIPLE_POLICY_TYPE,
    CONTRACT_POLICY,
    EXPORT_VALUE,
    NAME_ON_POLICY,
    DIFFERENT_NAME_ON_POLICY,
    NEED_PRE_CREDIT_PERIOD,
    CREDIT_PERIOD_WITH_BUYER,
    REQUESTED_JOINTLY_INSURED_PARTY: { REQUESTED, COMPANY_NAME, COMPANY_NUMBER, COUNTRY_CODE },
    USING_BROKER,
    BROKER_DETAILS: { NAME, FULL_ADDRESS },
    LOSS_PAYEE: { IS_APPOINTED },
    LOSS_PAYEE_DETAILS: { NAME: LOSS_PAYEE_NAME, LOCATION, IS_LOCATED_IN_UK, IS_LOCATED_INTERNATIONALLY },
    LOSS_PAYEE_FINANCIAL_UK: { SORT_CODE, ACCOUNT_NUMBER },
    LOSS_PAYEE_FINANCIAL_INTERNATIONAL: { BIC_SWIFT_CODE, IBAN },
    FINANCIAL_ADDRESS,
  },
} = INSURANCE_FIELD_IDS;

const { MAX_COVER_PERIOD_MONTHS } = ELIGIBILITY;
const {
  POLICY: { TOTAL_MONTHS_OF_COVER },
} = APPLICATION;

const { POLICY: POLICY_FORM_TITLES } = FORM_TITLES;

export const POLICY_FIELDS = {
  [POLICY_TYPE]: {
    ID: POLICY_TYPE,
    OPTIONS: {
      SINGLE: {
        ID: SINGLE_POLICY_TYPE,
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
        ID: MULTIPLE_POLICY_TYPE,
        VALUE: FIELD_VALUES.POLICY_TYPE.MULTIPLE,
        TEXT: 'Multiple contract policy (Revolving credit)',
        HINT_LIST: [
          `Covers multiple contracts with the same buyer, usually for ${TOTAL_MONTHS_OF_COVER.MAXIMUM} months`,
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
    [CURRENCY_CODE]: {
      LEGEND: "Select currency you'd like your policy to be issued in",
      HINT: 'This is the currency your policy will be issued in',
      SUMMARY: {
        TITLE: 'Policy currency',
        FORM_TITLE: POLICY_FORM_TITLES.CONTRACT_POLICY,
      },
      [ALTERNATIVE_CURRENCY_CODE]: {
        ID: ALTERNATIVE_CURRENCY_CODE,
        VALUE: ALTERNATIVE_CURRENCY_CODE,
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
      [CONTRACT_POLICY.SINGLE.TOTAL_CONTRACT_VALUE]: {
        LABEL: "What's the total value of the contract you want to insure?",
        HINT: 'Enter a whole number. Do not enter decimals.',
        SUMMARY: {
          TITLE: 'Contract value',
          FORM_TITLE: POLICY_FORM_TITLES.CONTRACT_POLICY,
        },
      },
      [CONTRACT_POLICY.SINGLE.REQUESTED_CREDIT_LIMIT]: {
        LABEL: 'What credit limit do you require?',
        HINT: {
          INTRO: 'For example, your total contract maybe £250,000 but the amount you want to insure is £100,000.',
          OUTRO: 'Enter a whole number. Do not enter decimals.',
        },
        SUMMARY: {
          TITLE: 'Credit limit',
          FORM_TITLE: POLICY_FORM_TITLES.CONTRACT_POLICY,
        },
      },
    },
    MULTIPLE: {
      [CONTRACT_POLICY.MULTIPLE.TOTAL_MONTHS_OF_COVER]: {
        LABEL: 'How many months do you want to be insured for?',
        HINT: `The maximum is ${TOTAL_MONTHS_OF_COVER.MAXIMUM} months.`,
        OPTIONS: FIELD_VALUES.TOTAL_MONTHS_OF_COVER,
        SUMMARY: {
          TITLE: 'How many months you want to be insured for',
          FORM_TITLE: POLICY_FORM_TITLES.CONTRACT_POLICY,
        },
      },
    },
  },
  EXPORT_VALUE: {
    MULTIPLE: {
      [EXPORT_VALUE.MULTIPLE.TOTAL_SALES_TO_BUYER]: {
        LABEL: 'Estimate total sales to your buyer during this time',
        HINT: 'Enter a whole number. Do not enter decimals.',
        SUMMARY: {
          TITLE: 'Estimated total sales to the buyer',
          FORM_TITLE: POLICY_FORM_TITLES.CONTRACT_POLICY,
        },
      },
      [EXPORT_VALUE.MULTIPLE.MAXIMUM_BUYER_WILL_OWE]: {
        LABEL: 'Estimate the maximum amount your buyer will owe you at any single point during this time',
        HINT: {
          FOR_EXAMPLE: 'For example, your total sales might be £250,000 but the maximum the buyer will owe you at any single point is £100,000.',
          NO_DECIMALS: 'Enter a whole number. Do not enter decimals.',
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
      MAXIMUM: MAXIMUM_CHARACTERS.NAME_ON_POLICY_POSITION,
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
      MAXIMUM: MAXIMUM_CHARACTERS.DIFFERENT_NAME_ON_POLICY,
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
      FORM_TITLE: POLICY_FORM_TITLES.CONTRACT_POLICY,
    },
  },
  [CREDIT_PERIOD_WITH_BUYER]: {
    LABEL: 'How long do you need pre-credit cover for?',
    SUMMARY: {
      TITLE: 'Period of pre-credit cover',
      FORM_TITLE: POLICY_FORM_TITLES.CONTRACT_POLICY,
    },
    MAXIMUM: MAXIMUM_CHARACTERS.CREDIT_PERIOD_WITH_BUYER,
  },
  REQUESTED_JOINTLY_INSURED_PARTY: {
    [REQUESTED]: {
      HINT: 'This could be a parent company, subsidiary or a subcontractor.',
      SUMMARY: {
        TITLE: 'Another company to be insured',
      },
    },
    [COMPANY_NAME]: {
      LABEL: 'Name of the other company',
      MAXIMUM: MAXIMUM_CHARACTERS.REQUESTED_JOINTLY_INSURED_PARTY.COMPANY_NAME,
      SUMMARY: {
        TITLE: 'Name of the other company',
      },
    },
    [COMPANY_NUMBER]: {
      LABEL: 'Registration number of the other company (optional)',
      MAXIMUM: MAXIMUM_CHARACTERS.REQUESTED_JOINTLY_INSURED_PARTY.COMPANY_NUMBER,
      SUMMARY: {
        TITLE: 'Registration number of the other company',
      },
    },
    [COUNTRY_CODE]: {
      LABEL: 'What country is the other company based in?',
      SUMMARY: {
        TITLE: 'Country of the company',
      },
    },
  },
  BROKER: {
    [USING_BROKER]: {
      LABEL: 'Are you using a broker to get this insurance?',
      SUMMARY: {
        TITLE: 'Using a broker',
        FORM_TITLE: POLICY_FORM_TITLES.BROKER,
      },
    },
  },
  BROKER_DETAILS: {
    [NAME]: {
      LABEL: 'Name of broker or company',
      MAXIMUM: MAXIMUM_CHARACTERS.BROKER_NAME,
      SUMMARY: {
        TITLE: "Broker's name or company",
        FORM_TITLE: POLICY_FORM_TITLES.BROKER,
      },
    },
    [EMAIL]: {
      LABEL: 'Email address',
      SUMMARY: {
        TITLE: "Broker's email",
        FORM_TITLE: POLICY_FORM_TITLES.BROKER,
      },
    },
    [FULL_ADDRESS]: {
      LABEL: "Broker's address",
      SUMMARY: {
        TITLE: "Broker's address",
        FORM_TITLE: POLICY_FORM_TITLES.BROKER,
      },
      MAXIMUM: MAXIMUM_CHARACTERS.FULL_ADDRESS,
    },
  },
  LOSS_PAYEE: {
    [IS_APPOINTED]: {
      HINT: {
        INTRO:
          'A loss payee is a financial organisation, like a bank or a lender, who will be paid in the event of a valid claim.  A loss payee could also be a parent company or subsidiary of your business.',
        OUTRO: "Not every policy has a loss payee. If you don't, select 'No' and you will be listed as the default claimant.",
      },
      SUMMARY: {
        TITLE: 'Appointed a loss payee',
        FORM_TITLE: POLICY_FORM_TITLES.LOSS_PAYEE,
      },
    },
  },
  LOSS_PAYEE_DETAILS: {
    [LOSS_PAYEE_NAME]: {
      LABEL: 'Name of the loss payee',
      MAXIMUM: MAXIMUM_CHARACTERS.LOSS_PAYEE_NAME,
      SUMMARY: {
        TITLE: 'Name of the loss payee',
        FORM_TITLE: POLICY_FORM_TITLES.LOSS_PAYEE,
      },
    },
    [LOCATION]: {
      LABEL: 'Where is the loss payee located?',
      OPTIONS: {
        UK: {
          ID: IS_LOCATED_IN_UK,
          VALUE: IS_LOCATED_IN_UK,
          TEXT: 'United Kingdom',
        },
        INTERNATIONALLY: {
          ID: IS_LOCATED_INTERNATIONALLY,
          VALUE: IS_LOCATED_INTERNATIONALLY,
          TEXT: 'International',
        },
      },
    },
  },
  LOSS_PAYEE_FINANCIAL_UK: {
    [SORT_CODE]: {
      LABEL: 'Sort code',
      HINT: 'Must be 6 digits long',
      SUMMARY: {
        TITLE: 'Sort code',
        FORM_TITLE: POLICY_FORM_TITLES.LOSS_PAYEE,
      },
    },
    [ACCOUNT_NUMBER]: {
      LABEL: 'Account number',
      HINT: 'Must be between 6 and 8 digits long',
      SUMMARY: {
        TITLE: 'Account number',
        FORM_TITLE: POLICY_FORM_TITLES.LOSS_PAYEE,
      },
    },
    [FINANCIAL_ADDRESS]: {
      SUMMARY: {
        TITLE: "Loss payee's bank based in the UK",
        FORM_TITLE: POLICY_FORM_TITLES.LOSS_PAYEE,
      },
    },
  },
  LOSS_PAYEE_FINANCIAL_INTERNATIONAL: {
    [BIC_SWIFT_CODE]: {
      LABEL: 'BIC or SWIFT code',
      HINT: 'Must be between 8 and 11 characters long',
      SUMMARY: {
        TITLE: 'BIC or SWIFT code',
        FORM_TITLE: POLICY_FORM_TITLES.LOSS_PAYEE,
      },
    },
    [IBAN]: {
      LABEL: 'IBAN',
      HINT: 'Must be between 16 and 34 characters long',
      SUMMARY: {
        TITLE: 'IBAN',
        FORM_TITLE: POLICY_FORM_TITLES.LOSS_PAYEE,
      },
    },
    [FINANCIAL_ADDRESS]: {
      SUMMARY: {
        TITLE: "Loss payee's bank based internationally",
        FORM_TITLE: POLICY_FORM_TITLES.LOSS_PAYEE,
      },
    },
  },
  FINANCIAL_ADDRESS: {
    LABEL: 'Bank address',
    MAXIMUM: MAXIMUM_CHARACTERS.FULL_ADDRESS,
  },
};
