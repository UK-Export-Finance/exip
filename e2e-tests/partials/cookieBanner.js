export const cookieBanner = {
  heading: () => cy.get('[data-cy="cookies-banner-heading"]'),
  hideButton: () => cy.get('[data-cy="cookies-banner-hide-button"]'),
  cookiesLink: () => cy.get('[data-cy="cookies-banner-cookies-link"]'),
  question: {
    copy: () => cy.get('[data-cy="cookies-question-banner-copy"]'),
    acceptButton: () => cy.get('[data-cy="cookies-question-banner-accept-button"]'),
    rejectButton: () => cy.get('[data-cy="cookies-question-banner-reject-button"]'),
  },
  accepted: {
    copy: () => cy.get('[data-cy="cookies-accepted-banner-copy"]'),
  },
  rejected: {
    copy: () => cy.get('[data-cy="cookies-rejected-banner-copy"]'),
  },
};
