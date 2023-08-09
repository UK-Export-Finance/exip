import { FIELD_IDS } from '../../constants';

const {
  ELIGIBILITY: {
    CONTRACT_VALUE,
    MAX_AMOUNT_OWED,
    PERCENTAGE_OF_COVER,
  },
  MULTIPLE_POLICY_LENGTH,
  SINGLE_POLICY_LENGTH,
  QUOTE: {
    PREMIUM_RATE_PERCENTAGE,
    BUYER_LOCATION,
    ESTIMATED_COST,
    INSURED_FOR,
  },
} = FIELD_IDS;

const yourQuotePage = {
  panel: {
    subHeading: () => cy.get('[data-cy="sub-heading"]'),
    summaryList: {
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
      [PREMIUM_RATE_PERCENTAGE]: {
        key: () => cy.get(`.${PREMIUM_RATE_PERCENTAGE}-key`),
        value: () => cy.get(`.${PREMIUM_RATE_PERCENTAGE}-value`),
        changeLink: () => cy.get(`[data-cy="${PREMIUM_RATE_PERCENTAGE}-change-link"]`),
      },
      [BUYER_LOCATION]: {
        key: () => cy.get(`.${BUYER_LOCATION}-key`),
        value: () => cy.get(`.${BUYER_LOCATION}-value`),
        changeLink: () => cy.get(`[data-cy="${BUYER_LOCATION}-change-link"]`),
      },
      [ESTIMATED_COST]: {
        key: () => cy.get(`.${ESTIMATED_COST}-key`),
        value: () => cy.get(`.${ESTIMATED_COST}-value`),
        changeLink: () => cy.get(`[data-cy="${ESTIMATED_COST}-change-link"]`),
      },
      [PERCENTAGE_OF_COVER]: {
        key: () => cy.get(`.${PERCENTAGE_OF_COVER}-key`),
        value: () => cy.get(`.${PERCENTAGE_OF_COVER}-value`),
        changeLink: () => cy.get(`[data-cy="${PERCENTAGE_OF_COVER}-change-link"]`),
      },
      [INSURED_FOR]: {
        key: () => cy.get(`.${INSURED_FOR}-key`),
        value: () => cy.get(`.${INSURED_FOR}-value`),
        changeLink: () => cy.get(`[data-cy="${INSURED_FOR}-change-link"]`),
      },
      [SINGLE_POLICY_LENGTH]: {
        key: () => cy.get(`.${SINGLE_POLICY_LENGTH}-key`),
        value: () => cy.get(`.${SINGLE_POLICY_LENGTH}-value`),
        changeLink: () => cy.get(`[data-cy="${SINGLE_POLICY_LENGTH}-change-link"]`),
      },
      [MULTIPLE_POLICY_LENGTH]: {
        key: () => cy.get(`.${MULTIPLE_POLICY_LENGTH}-key`),
        value: () => cy.get(`.${MULTIPLE_POLICY_LENGTH}-value`),
        changeLink: () => cy.get(`[data-cy="${MULTIPLE_POLICY_LENGTH}-change-link"]`),
      },
      [PREMIUM_RATE_PERCENTAGE]: {
        key: () => cy.get(`.${PREMIUM_RATE_PERCENTAGE}-key`),
        value: () => cy.get(`.${PREMIUM_RATE_PERCENTAGE}-value`),
        changeLink: () => cy.get(`[data-cy="${PREMIUM_RATE_PERCENTAGE}-change-link"]`),
      },
    },
  },
  noticeList: {
    item1: () => cy.get('[data-cy="notice-list-item-1"]'),
    item2: () => cy.get('[data-cy="notice-list-item-2"]'),
    item3: () => cy.get('[data-cy="notice-list-item-3"]'),
  },
  whatHappensNext: {
    heading: () => cy.get('[data-cy="what-happens-next-heading"]'),
    intro: {
      youCan: () => cy.get('[data-cy="what-happens-next-intro-you-can"]'),
      fullApplicationLink: () => cy.get('[data-cy="what-happens-next-full-application-link"]'),
      timeframe: () => cy.get('[data-cy="what-happens-next-intro-timeframe"]'),
      canGetHelp: () => cy.get('[data-cy="what-happens-next-intro-can-get-help"]'),
    },
    financeManagers: {
      heading: () => cy.get('[data-cy="what-happens-next-finance-managers-heading"]'),
      available: () => cy.get('[data-cy="what-happens-next-finance-managers-available"]'),
      link: () => cy.get('[data-cy="what-happens-next-finance-managers-link"]'),
    },
    brokers: {
      heading: () => cy.get('[data-cy="what-happens-next-brokers-heading"]'),
      actAs: () => cy.get('[data-cy="what-happens-next-brokers-act-as"]'),
      theyReceive: {
        intro: () => cy.get('[data-cy="what-happens-next-brokers-they-receive-intro"]'),
        link: () => cy.get('[data-cy="what-happens-next-brokers-link"]'),
        outro: () => cy.get('[data-cy="what-happens-next-brokers-outro"]'),
      },
    },
  },
  links: {
    startAgain: () => cy.get('[data-cy="start-again"]'),
    feedback: () => cy.get('[data-cy="feedback"]'),
  },
};

export default yourQuotePage;
