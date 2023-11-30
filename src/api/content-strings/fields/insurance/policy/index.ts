import { FIELD_IDS } from '../../../../constants/field-ids';

const { POLICY } = FIELD_IDS.INSURANCE;
const { CONTRACT_POLICY, ABOUT_GOODS_OR_SERVICES } = POLICY;

export const POLICY_FIELDS = {
  [POLICY.POLICY_TYPE]: {
    ID: FIELD_IDS.POLICY_TYPE,
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
          TITLE: 'Date you expect contract to complete',
        },
      },
      [CONTRACT_POLICY.SINGLE.TOTAL_CONTRACT_VALUE]: {
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
      [CONTRACT_POLICY.MULTIPLE.TOTAL_SALES_TO_BUYER]: {
        SUMMARY: {
          TITLE: 'Estimated sales during policy',
        },
      },
      [CONTRACT_POLICY.MULTIPLE.MAXIMUM_BUYER_WILL_OWE]: {
        SUMMARY: {
          TITLE: 'Maximum owed at any single point during policy',
        },
      },
    },
  },
  ABOUT_GOODS_OR_SERVICES: {
    [ABOUT_GOODS_OR_SERVICES.DESCRIPTION]: {
      SUMMARY: {
        TITLE: "Goods or services you're exporting",
      },
    },
    [ABOUT_GOODS_OR_SERVICES.FINAL_DESTINATION]: {
      SUMMARY: {
        TITLE: 'Final destination of export',
      },
    },
  },
};
