import { FIELD_IDS } from '../../../constants';

const ukContentPercentagePage = {
  heading: () => cy.get('[data-cy="heading"]'),
  yes: () => cy.get(`[data-cy="${FIELD_IDS.UK_CONTENT_PERCENTAGE}-yes"]`),
  yesInput: () => cy.get(`[data-cy="${FIELD_IDS.UK_CONTENT_PERCENTAGE}-yes-input"]`),
  no: () => cy.get(`[data-cy="${FIELD_IDS.UK_CONTENT_PERCENTAGE}-no"]`),
  noInput: () => cy.get(`[data-cy="${FIELD_IDS.UK_CONTENT_PERCENTAGE}-no-input"]`),
  errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.UK_CONTENT_PERCENTAGE}-error-message"]`),
  submitButton: () => cy.get('[data-cy="submit-button"]'),
  details: {
    summary: () => cy.get('[data-cy="details"] summary'),
    includes: {
      copy: () => cy.get('[data-cy="details-includes"]'),
      listItem1: () => cy.get('[data-cy="details-includes-item-1"]'),
      listItem2: () => cy.get('[data-cy="details-includes-item-2"]'),
      listItem3: () => cy.get('[data-cy="details-includes-item-3"]'),
      listItem3Link: () => cy.get('[data-cy="details-includes-item-3-link"]'),
      listItem4: () => cy.get('[data-cy="details-includes-item-4"]'),
      listItem4Link: () => cy.get('[data-cy="details-includes-item-4-link"]'),
    },
    doesNotCount: {
      heading: () => cy.get('[data-cy="details-does-not-count-heading"]'),
      copy: () => cy.get('[data-cy="details-does-not-count-copy"]'),
    },
    staffingCosts: {
      heading: () => cy.get('[data-cy="details-staffing-costs-heading"]'),
      copy: () => cy.get('[data-cy="details-staffing-costs-copy"]'),
      listItem1: () => cy.get('[data-cy="details-staffing-costs-list-item-1"]'),
      listItem2: () => cy.get('[data-cy="details-staffing-costs-list-item-2"]'),
      listItem3: () => cy.get('[data-cy="details-staffing-costs-list-item-3"]'),
    },
    nonPhysicalAssets: {
      heading: () => cy.get('[data-cy="details-non-physical-assets-heading"]'),
      copy: () => cy.get('[data-cy="details-non-physical-assets-copy"]'),
    },
    notSure: {
      heading: () => cy.get('[data-cy="details-not-sure-heading"]'),
      details1: () => cy.get('[data-cy="details-not-sure"]').children('[data-cy="details-1"]'),
      details1Link: () => cy.get('[data-cy="details-not-sure"] a'),
      details2: () => cy.get('[data-cy="details-not-sure"]').children('[data-cy="details-2"]'),
    },
  },
};

export default ukContentPercentagePage;
