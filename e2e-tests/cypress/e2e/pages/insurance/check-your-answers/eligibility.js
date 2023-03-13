import SHARED from './shared';
import { FIELD_IDS } from '../../../../../constants';

const {
  WANT_COVER_OVER_MAX_AMOUNT,
  WANT_COVER_OVER_MAX_PERIOD,
  OTHER_PARTIES_INVOLVED,
  LETTER_OF_CREDIT,
  PRE_CREDIT_PERIOD,
  COMPANIES_HOUSE_NUMBER,
  BUYER_COUNTRY,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_EXPORTER_LOCATION,
} = FIELD_IDS.INSURANCE.ELIGIBILITY;

const eligibilityCheckYourAnswers = {
  ...SHARED,
  summaryList: {
    [BUYER_COUNTRY]: {
      key: () => cy.get(`.${BUYER_COUNTRY}-key`),
      value: () => cy.get(`.${BUYER_COUNTRY}-value`),
      changeLink: () => cy.get(`[data-cy="${BUYER_COUNTRY}-change-link"]`),
    },
    [VALID_EXPORTER_LOCATION]: {
      key: () => cy.get(`.${VALID_EXPORTER_LOCATION}-key`),
      value: () => cy.get(`.${VALID_EXPORTER_LOCATION}-value`),
      changeLink: () => cy.get(`[data-cy="${VALID_EXPORTER_LOCATION}-change-link"]`),
    },
    [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: {
      key: () => cy.get(`.${HAS_MINIMUM_UK_GOODS_OR_SERVICES}-key`),
      value: () => cy.get(`.${HAS_MINIMUM_UK_GOODS_OR_SERVICES}-value`),
      changeLink: () => cy.get(`[data-cy="${HAS_MINIMUM_UK_GOODS_OR_SERVICES}-change-link"]`),
    },
    [WANT_COVER_OVER_MAX_AMOUNT]: {
      key: () => cy.get(`.${WANT_COVER_OVER_MAX_AMOUNT}-key`),
      value: () => cy.get(`.${WANT_COVER_OVER_MAX_AMOUNT}-value`),
      changeLink: () => cy.get(`[data-cy="${WANT_COVER_OVER_MAX_AMOUNT}-change-link"]`),
    },
    [WANT_COVER_OVER_MAX_PERIOD]: {
      key: () => cy.get(`.${WANT_COVER_OVER_MAX_PERIOD}-key`),
      value: () => cy.get(`.${WANT_COVER_OVER_MAX_PERIOD}-value`),
      changeLink: () => cy.get(`[data-cy="${WANT_COVER_OVER_MAX_PERIOD}-change-link"]`),
    },
    [OTHER_PARTIES_INVOLVED]: {
      key: () => cy.get(`.${OTHER_PARTIES_INVOLVED}-key`),
      value: () => cy.get(`.${OTHER_PARTIES_INVOLVED}-value`),
      changeLink: () => cy.get(`[data-cy="${OTHER_PARTIES_INVOLVED}-change-link"]`),
    },
    [LETTER_OF_CREDIT]: {
      key: () => cy.get(`.${LETTER_OF_CREDIT}-key`),
      value: () => cy.get(`.${LETTER_OF_CREDIT}-value`),
      changeLink: () => cy.get(`[data-cy="${LETTER_OF_CREDIT}-change-link"]`),
    },
    [PRE_CREDIT_PERIOD]: {
      key: () => cy.get(`.${PRE_CREDIT_PERIOD}-key`),
      value: () => cy.get(`.${PRE_CREDIT_PERIOD}-value`),
      changeLink: () => cy.get(`[data-cy="${PRE_CREDIT_PERIOD}-change-link"]`),
    },
    [COMPANIES_HOUSE_NUMBER]: {
      key: () => cy.get(`.${COMPANIES_HOUSE_NUMBER}-key`),
      value: () => cy.get(`.${COMPANIES_HOUSE_NUMBER}-value`),
      changeLink: () => cy.get(`[data-cy="${COMPANIES_HOUSE_NUMBER}-change-link"]`),
    },
  },
};

export default eligibilityCheckYourAnswers;
