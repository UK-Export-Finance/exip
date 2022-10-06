import { FIELD_IDS } from '../../../constants';

const cookiesPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  body1: () => cy.get('[data-cy="body-1"]'),
  body2: () => cy.get('[data-cy="body-2"]'),
  essentialCookies: {
    heading: () => cy.get('[data-cy="essential-cookies-heading"]'),
    intro: () => cy.get('[data-cy="essential-cookies-intro"]'),
    table: {
      head: {
        cell1: () => cy.get('[data-cy="essential-cookies-table-head-cell-1"]'),
        cell2: () => cy.get('[data-cy="essential-cookies-table-head-cell-2"]'),
        cell3: () => cy.get('[data-cy="essential-cookies-table-head-cell-3"]'),
      },
      body: {
        row1: {
          cell1: () => cy.get('[data-cy="essential-cookies-table-row-1-cell-1"]'),
          cell2: () => cy.get('[data-cy="essential-cookies-table-row-1-cell-2"]'),
          cell3: () => cy.get('[data-cy="essential-cookies-table-row-1-cell-3"]'),
        },
        row2: {
          cell1: () => cy.get('[data-cy="essential-cookies-table-row-2-cell-1"]'),
          cell2: () => cy.get('[data-cy="essential-cookies-table-row-2-cell-2"]'),
          cell3: () => cy.get('[data-cy="essential-cookies-table-row-2-cell-3"]'),
        },
      },
    },
  },
  optionalCookies: {
    heading: () => cy.get('[data-cy="optional-cookies-heading"]'),
    body1: () => cy.get('[data-cy="optional-cookies-body-1"]'),
    body2: () => cy.get('[data-cy="optional-cookies-body-2"]'),
    body3: () => cy.get('[data-cy="optional-cookies-body-3"]'),
    analyticsInfoList: {
      item1: () => cy.get('[data-cy="analytics-info-list"] li').eq(0),
      item2: () => cy.get('[data-cy="analytics-info-list"] li').eq(1),
      item3: () => cy.get('[data-cy="analytics-info-list"] li').eq(2),
    },
    acceptInput: () => cy.get(`[data-cy="accept-input"]`),
    acceptLabel: () => cy.get(`[data-cy="accept-label"]`),
    rejectInput: () => cy.get(`[data-cy="reject-input"]`),
    rejectLabel: () => cy.get(`[data-cy="reject-label"]`),
    errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.OPTIONAL_COOKIES}-error-message"]`),
    submitButton: () => cy.get('[data-cy="submit-button"]'),
  },
  successBanner: {
    heading: () => cy.get(`[data-cy="success-message-heading"]`),
    body: () => cy.get(`[data-cy="success-message-body"]`),
    goBackLink: () => cy.get(`[data-cy="success-message-go-back-link"]`),
  },
};

export default cookiesPage;
