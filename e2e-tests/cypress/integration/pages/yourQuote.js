import { FIELD_IDS } from '../../../constants';

const {
  QUOTE,
  SINGLE_POLICY_LENGTH,
  MULTI_POLICY_LENGTH,
} = FIELD_IDS;

const yourQuotePage = {
  panel: {
    heading: () => cy.get('[data-cy="heading"]'),
    subHeading: () => cy.get('[data-cy="sub-heading"]'),
    summaryList: {
      [QUOTE.INSURED_FOR]: {
        key: () => cy.get(`.${QUOTE.INSURED_FOR}-key`),
        value: () => cy.get(`.${QUOTE.INSURED_FOR}-value`),
        changeLink: () => cy.get(`[data-cy="${QUOTE.INSURED_FOR}-change-link"]`),
      },
      [QUOTE.PREMIUM_RATE_PERCENTAGE]: {
        key: () => cy.get(`.${QUOTE.PREMIUM_RATE_PERCENTAGE}-key`),
        value: () => cy.get(`.${QUOTE.PREMIUM_RATE_PERCENTAGE}-value`),
        changeLink: () => cy.get(`[data-cy="${QUOTE.PREMIUM_RATE_PERCENTAGE}-change-link"]`),
      },
      [QUOTE.ESTIMATED_COST]: {
        key: () => cy.get(`.${QUOTE.ESTIMATED_COST}-key`),
        value: () => cy.get(`.${QUOTE.ESTIMATED_COST}-value`),
        changeLink: () => cy.get(`[data-cy="${QUOTE.ESTIMATED_COST}-change-link"]`),
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
      [QUOTE.BUYER_LOCATION]: {
        key: () => cy.get(`.${QUOTE.BUYER_LOCATION}-key`),
        value: () => cy.get(`.${QUOTE.BUYER_LOCATION}-value`),
        changeLink: () => cy.get(`[data-cy="${QUOTE.BUYER_LOCATION}-change-link"]`),
      },
    },
  },
  noticeList: {
    item1: () => cy.get('[data-cy="notice-list-item-1"]'),
    item2: () => cy.get('[data-cy="notice-list-item-2"]'),
    item3: () => cy.get('[data-cy="notice-list-item-3"]'),
  },
  whatHappensNext: {
    intro: {
      heading: () => cy.get('[data-cy="what-happens-next-heading"]'),
      listItems: () => cy.get('[data-cy="what-happens-next-intro"] li'),
    },
    financeManagers: {
      heading: () => cy.get('[data-cy="what-happens-next-finance-managers-heading"]'),
      listItems: () => cy.get('[data-cy="what-happens-next-finance-managers"] li'),
    },
    brokers: {
      heading: () => cy.get('[data-cy="what-happens-next-brokers-heading"]'),
      listItems: () => cy.get('[data-cy="what-happens-next-brokers"] li'),
    },
  },
  links: {
    startAgain: () => cy.get('[data-cy="start-again"]'),
    feedback: () => cy.get('[data-cy="feedback"]'),
  },
};

export default yourQuotePage;
