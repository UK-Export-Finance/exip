import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';

const {
  POLICY: {
    CONTRACT_POLICY,
    EXPORT_VALUE,
    BROKER: { USING_BROKER, NAME, ADDRESS_LINE_1, EMAIL },
    POLICY_TYPE,
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
        HINT: 'Enter a whole number - do not enter decimals.',
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
        HINT: 'Enter a whole number - do not enter decimals.',
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
      SUMMARY: {
        TITLE: 'Using a broker',
      },
    },
    [NAME]: {
      SUMMARY: {
        TITLE: "Broker's name or company",
      },
    },
    [ADDRESS_LINE_1]: {
      SUMMARY: {
        TITLE: "Broker's address",
      },
    },
    [EMAIL]: {
      SUMMARY: {
        TITLE: "Broker's email",
      },
    },
  },
};
