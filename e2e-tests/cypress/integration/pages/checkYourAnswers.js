import { FIELD_IDS } from '../../../constants';

const {
  VALID_COMPANY_BASE,
  BUYER_COUNTRY,
  TRIED_PRIVATE_COVER_NO,
  UK_CONTENT_PERCENTAGE,
  CURRENCY,
  AMOUNT,
  CREDIT_PERIOD,
  SINGLE_POLICY_TYPE,
  MULTI_POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
  MULTI_POLICY_LENGTH,
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
      [TRIED_PRIVATE_COVER_NO]: {
        key: () => cy.get(`.${TRIED_PRIVATE_COVER_NO}-key`),
        value: () => cy.get(`.${TRIED_PRIVATE_COVER_NO}-value`),
        changeLink: () => cy.get(`[data-cy="${TRIED_PRIVATE_COVER_NO}-change-link"]`),
      },
      [UK_CONTENT_PERCENTAGE]: {
        key: () => cy.get(`.${UK_CONTENT_PERCENTAGE}-key`),
        value: () => cy.get(`.${UK_CONTENT_PERCENTAGE}-value`),
        changeLink: () => cy.get(`[data-cy="${UK_CONTENT_PERCENTAGE}-change-link"]`),
      },
    },
    policy: {
      heading: () => cy.get('[data-cy="summaryList-heading-policy"]'),
      [CURRENCY]: {
        key: () => cy.get(`.${CURRENCY}-key`),
        value: () => cy.get(`.${CURRENCY}-value`),
        changeLink: () => cy.get(`[data-cy="${CURRENCY}-change-link"]`),
      },
      [AMOUNT]: {
        key: () => cy.get(`.${AMOUNT}-key`),
        value: () => cy.get(`.${AMOUNT}-value`),
        changeLink: () => cy.get(`[data-cy="${AMOUNT}-change-link"]`),
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
      [CREDIT_PERIOD]: {
        key: () => cy.get(`.${CREDIT_PERIOD}-key`),
        value: () => cy.get(`.${CREDIT_PERIOD}-value`),
        changeLink: () => cy.get(`[data-cy="${CREDIT_PERIOD}-change-link"]`),
      },
    },
  },
};

export default checkYourAnswersPage;
