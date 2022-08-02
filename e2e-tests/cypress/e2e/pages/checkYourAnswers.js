import { FIELD_IDS } from '../../../constants';

const {
  BUYER_COUNTRY,
  CONTRACT_VALUE,
  CREDIT_PERIOD,
  CURRENCY,
  MAX_AMOUNT_OWED,
  MULTI_POLICY_LENGTH,
  MULTI_POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
  SINGLE_POLICY_TYPE,
  PERCENTAGE_OF_COVER,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_COMPANY_BASE,
} = FIELD_IDS;

const checkYourAnswersPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  submitButton: () => cy.get('[data-cy="submit-button"]'),

  summaryLists: {
    export: {
      heading: () => cy.get('[data-cy="summaryList-heading-export"]'),
      [BUYER_COUNTRY]: {
        key: () => cy.get(`.${BUYER_COUNTRY}-key`),
        value: () => cy.get(`.${BUYER_COUNTRY}-value`),
        changeLink: () => cy.get(`[data-cy="${BUYER_COUNTRY}-change-link"]`),
      },
      [VALID_COMPANY_BASE]: {
        key: () => cy.get(`.${VALID_COMPANY_BASE}-key`),
        value: () => cy.get(`.${VALID_COMPANY_BASE}-value`),
        changeLink: () => cy.get(`[data-cy="${VALID_COMPANY_BASE}-change-link"]`),
      },
      [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: {
        key: () => cy.get(`.${HAS_MINIMUM_UK_GOODS_OR_SERVICES}-key`),
        value: () => cy.get(`.${HAS_MINIMUM_UK_GOODS_OR_SERVICES}-value`),
        changeLink: () => cy.get(`[data-cy="${HAS_MINIMUM_UK_GOODS_OR_SERVICES}-change-link"]`),
      },
    },
    policy: {
      heading: () => cy.get('[data-cy="summaryList-heading-policy"]'),
      [CURRENCY]: {
        key: () => cy.get(`.${CURRENCY}-key`),
        value: () => cy.get(`.${CURRENCY}-value`),
        changeLink: () => cy.get(`[data-cy="${CURRENCY}-change-link"]`),
      },
      [CONTRACT_VALUE]: {
        key: () => cy.get(`.${CONTRACT_VALUE}-key`),
        value: () => cy.get(`.${CONTRACT_VALUE}-value`),
        changeLink: () => cy.get(`[data-cy="${CONTRACT_VALUE}-change-link"]`),
      },
      [MAX_AMOUNT_OWED]: {
        key: () => cy.get(`.${MAX_AMOUNT_OWED}-key`),
        value: () => cy.get(`.${MAX_AMOUNT_OWED}-value`),
        changeLink: () => cy.get(`[data-cy="${MAX_AMOUNT_OWED}-change-link"]`),
      },
      [SINGLE_POLICY_TYPE]: {
        key: () => cy.get(`.${SINGLE_POLICY_TYPE}-key`),
        value: () => cy.get(`.${SINGLE_POLICY_TYPE}-value`),
        changeLink: () => cy.get(`[data-cy="${SINGLE_POLICY_TYPE}-change-link"]`),
      },
      [MULTI_POLICY_TYPE]: {
        key: () => cy.get(`.${MULTI_POLICY_TYPE}-key`),
        value: () => cy.get(`.${MULTI_POLICY_TYPE}-value`),
        changeLink: () => cy.get(`[data-cy="${MULTI_POLICY_TYPE}-change-link"]`),
      },
      [SINGLE_POLICY_LENGTH]: {
        key: () => cy.get(`.${SINGLE_POLICY_LENGTH}-key`),
        value: () => cy.get(`.${SINGLE_POLICY_LENGTH}-value`),
        changeLink: () => cy.get(`[data-cy="${SINGLE_POLICY_LENGTH}-change-link"]`),
      },
      [MULTI_POLICY_LENGTH]: {
        key: () => cy.get(`.${MULTI_POLICY_LENGTH}-key`),
        value: () => cy.get(`.${MULTI_POLICY_LENGTH}-value`),
        changeLink: () => cy.get(`[data-cy="${MULTI_POLICY_LENGTH}-change-link"]`),
      },
      [PERCENTAGE_OF_COVER]: {
        key: () => cy.get(`.${PERCENTAGE_OF_COVER}-key`),
        value: () => cy.get(`.${PERCENTAGE_OF_COVER}-value`),
        changeLink: () => cy.get(`[data-cy="${PERCENTAGE_OF_COVER}-change-link"]`),
      },
      [CREDIT_PERIOD]: {
        key: () => cy.get(`.${CREDIT_PERIOD}-key`),
        value: () => cy.get(`.${CREDIT_PERIOD}-value`),
        changeLink: () => cy.get(`[data-cy="${CREDIT_PERIOD}-change-link"]`),
      },
    },
  },
};

export default checkYourAnswersPage;
