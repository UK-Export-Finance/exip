import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';

const {
  POLICY: {
    CONTRACT_POLICY,
    EXPORT_VALUE,
    POLICY_TYPE,
    USING_BROKER,
    BROKER_DETAILS: { NAME, EMAIL, FULL_ADDRESS },
  },
} = INSURANCE_FIELD_IDS;

export const POLICY_FIELDS = {
  [POLICY_TYPE]: {
    ID: POLICY_TYPE,
    SUMMARY: {
      TITLE: 'Policy type',
    },
  },
  CONTRACT_POLICY: {
    [CONTRACT_POLICY.REQUESTED_START_DATE]: {
      SUMMARY: {
        TITLE: 'Policy start date',
      },
    },
    [CONTRACT_POLICY.POLICY_CURRENCY_CODE]: {
      SUMMARY: {
        TITLE: 'Policy currency',
      },
    },
    SINGLE: {
      [CONTRACT_POLICY.SINGLE.CONTRACT_COMPLETION_DATE]: {
        SUMMARY: {
          TITLE: 'Date you expect it to complete',
        },
      },
      [CONTRACT_POLICY.SINGLE.TOTAL_CONTRACT_VALUE]: {
        HINT: 'Enter a whole number. Do not enter decimals.',
        SUMMARY: {
          TITLE: 'Contract value',
        },
      },
    },
    MULTIPLE: {
      [CONTRACT_POLICY.MULTIPLE.TOTAL_MONTHS_OF_COVER]: {
        SUMMARY: {
          TITLE: 'How many months you want to be insured for',
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
        },
      },
    },
  },
  BROKER: {
    [USING_BROKER]: {
      LABEL: 'Are you using a broker to get this insurance?',
      SUMMARY: {
        TITLE: 'Using a broker',
      },
    },
  },
  BROKER_DETAILS: {
    [NAME]: {
      LABEL: 'Name of broker or company',
      SUMMARY: {
        TITLE: "Broker's name or company",
      },
    },
    [EMAIL]: {
      LABEL: 'Email address',
      SUMMARY: {
        TITLE: "Broker's email",
      },
    },
    [FULL_ADDRESS]: {
      LABEL: "Broker's address",
      SUMMARY: {
        TITLE: "Broker's address",
      },
    },
  },
};
