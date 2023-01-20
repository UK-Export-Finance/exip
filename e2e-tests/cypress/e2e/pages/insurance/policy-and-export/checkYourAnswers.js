import { FIELD_IDS } from '../../../../../constants';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      TYPE_OF_POLICY: { POLICY_TYPE },
      CONTRACT_POLICY: {
        REQUESTED_START_DATE,
        CREDIT_PERIOD_WITH_BUYER,
        POLICY_CURRENCY_CODE,
        SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
        MULTIPLE: {
          TOTAL_MONTHS_OF_COVER,
          TOTAL_SALES_TO_BUYER,
          MAXIMUM_BUYER_WILL_OWE,
        },
      },
      ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
    },
  },
} = FIELD_IDS;

const checkYourAnswers = {
  summaryList: {
    [POLICY_TYPE]: {
      key: () => cy.get(`.${POLICY_TYPE}-key`),
      value: () => cy.get(`.${POLICY_TYPE}-value`),
    },
    [REQUESTED_START_DATE]: {
      key: () => cy.get(`.${REQUESTED_START_DATE}-key`),
      value: () => cy.get(`.${REQUESTED_START_DATE}-value`),
    },
    [CONTRACT_COMPLETION_DATE]: {
      key: () => cy.get(`.${CONTRACT_COMPLETION_DATE}-key`),
      value: () => cy.get(`.${CONTRACT_COMPLETION_DATE}-value`),
    },
    [TOTAL_MONTHS_OF_COVER]: {
      key: () => cy.get(`.${TOTAL_MONTHS_OF_COVER}-key`),
      value: () => cy.get(`.${TOTAL_MONTHS_OF_COVER}-value`),
    },
    [TOTAL_CONTRACT_VALUE]: {
      key: () => cy.get(`.${TOTAL_CONTRACT_VALUE}-key`),
      value: () => cy.get(`.${TOTAL_CONTRACT_VALUE}-value`),
    },
    [TOTAL_SALES_TO_BUYER]: {
      key: () => cy.get(`.${TOTAL_SALES_TO_BUYER}-key`),
      value: () => cy.get(`.${TOTAL_SALES_TO_BUYER}-value`),
    },
    [MAXIMUM_BUYER_WILL_OWE]: {
      key: () => cy.get(`.${MAXIMUM_BUYER_WILL_OWE}-key`),
      value: () => cy.get(`.${MAXIMUM_BUYER_WILL_OWE}-value`),
    },
    [CREDIT_PERIOD_WITH_BUYER]: {
      key: () => cy.get(`.${CREDIT_PERIOD_WITH_BUYER}-key`),
      value: () => cy.get(`.${CREDIT_PERIOD_WITH_BUYER}-value`),
    },
    [POLICY_CURRENCY_CODE]: {
      key: () => cy.get(`.${POLICY_CURRENCY_CODE}-key`),
      value: () => cy.get(`.${POLICY_CURRENCY_CODE}-value`),
    },
    [DESCRIPTION]: {
      key: () => cy.get(`.${DESCRIPTION}-key`),
      value: () => cy.get(`.${DESCRIPTION}-value`),
    },
    [FINAL_DESTINATION]: {
      key: () => cy.get(`.${FINAL_DESTINATION}-key`),
      value: () => cy.get(`.${FINAL_DESTINATION}-value`),
    },
  },
};

export default checkYourAnswers;
