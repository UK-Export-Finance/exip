import { FIELD_IDS } from '../../../constants';

const {
  VALID_COMPANY_BASE,
  BUYER_COUNTRY,
  TRIED_PRIVATE_COVER,
  UK_CONTENT_PERCENTAGE,
  CURRENCY,
  AMOUNT,
  PRE_CREDIT_PERIOD,
  CREDIT_PERIOD,
  POLICY_TYPE,
  POLICY_LENGTH,
} = FIELD_IDS;

const checkYourAnswersPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  submitButton: () => cy.get('[data-cy="submit-button"]'),

  summaryLists: {
    company: {
      heading: () => cy.get('[data-cy="summaryList-heading-company"]'),
      [VALID_COMPANY_BASE]: {
        key: () => cy.get(`.${VALID_COMPANY_BASE}-key`),
        value: () => cy.get(`.${VALID_COMPANY_BASE}-value`),
        changeLink: () => cy.get(`[data-cy="${VALID_COMPANY_BASE}-change-link"]`),
      },
    },
    export: {
      heading: () => cy.get('[data-cy="summaryList-heading-export"]'),
      [BUYER_COUNTRY]: {
        key: () => cy.get(`.${BUYER_COUNTRY}-key`),
        value: () => cy.get(`.${BUYER_COUNTRY}-value`),
        changeLink: () => cy.get(`[data-cy="${BUYER_COUNTRY}-change-link"]`),
      },
      [TRIED_PRIVATE_COVER]: {
        key: () => cy.get(`.${TRIED_PRIVATE_COVER}-key`),
        value: () => cy.get(`.${TRIED_PRIVATE_COVER}-value`),
        changeLink: () => cy.get(`[data-cy="${TRIED_PRIVATE_COVER}-change-link"]`),
      },
      [UK_CONTENT_PERCENTAGE]: {
        key: () => cy.get(`.${UK_CONTENT_PERCENTAGE}-key`),
        value: () => cy.get(`.${UK_CONTENT_PERCENTAGE}-value`),
        changeLink: () => cy.get(`[data-cy="${UK_CONTENT_PERCENTAGE}-change-link"]`),
      },
    },
    deal: {
      heading: () => cy.get('[data-cy="summaryList-heading-deal"]'),
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
      [PRE_CREDIT_PERIOD]: {
        key: () => cy.get(`.${PRE_CREDIT_PERIOD}-key`),
        value: () => cy.get(`.${PRE_CREDIT_PERIOD}-value`),
        changeLink: () => cy.get(`[data-cy="${PRE_CREDIT_PERIOD}-change-link"]`),
      },
      [CREDIT_PERIOD]: {
        key: () => cy.get(`.${CREDIT_PERIOD}-key`),
        value: () => cy.get(`.${CREDIT_PERIOD}-value`),
        changeLink: () => cy.get(`[data-cy="${CREDIT_PERIOD}-change-link"]`),
      },
      [POLICY_TYPE]: {
        key: () => cy.get(`.${POLICY_TYPE}-key`),
        value: () => cy.get(`.${POLICY_TYPE}-value`),
        changeLink: () => cy.get(`[data-cy="${POLICY_TYPE}-change-link"]`),
      },
      [POLICY_LENGTH]: {
        key: () => cy.get(`.${POLICY_LENGTH}-key`),
        value: () => cy.get(`.${POLICY_LENGTH}-value`),
        changeLink: () => cy.get(`[data-cy="${POLICY_LENGTH}-change-link"]`),
      },
    },
  },
};

export default checkYourAnswersPage;
