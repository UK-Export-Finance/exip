const eligibleToApplyOnlinePage = {
  insetText: () => cy.get('[data-cy="inset-text"]'),
  privacyIntro: () => cy.get('[data-cy="privacy-intro"]'),
  privacyNotice: () => cy.get('[data-cy="privacy-notice"]'),
  privacyNoticeLink: () => cy.get('[data-cy="privacy-notice-link"]'),
  continueSubmit: () => cy.get('[data-cy="continue-submit"]'),
};

export default eligibleToApplyOnlinePage;
