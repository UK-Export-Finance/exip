const cookieBanner = {
  heading: () => cy.get('[data-cy="cookies-banner-heading"]'),
  hideButton: () => cy.get('[data-cy="cookies-banner-hide-button"]'),
  cookiesLink: () => cy.get('[data-cy="cookies-banner-cookies-link"]'),
  question: {
    copy1: () => cy.get('[data-cy="cookies-question-banner-copy-1"]'),
    copy2: () => cy.get('[data-cy="cookies-question-banner-copy-2"]'),
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

export default cookieBanner;
