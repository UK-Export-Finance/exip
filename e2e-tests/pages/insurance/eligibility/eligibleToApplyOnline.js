const eligibleToApplyOnlinePage = {
  insetText: () => cy.get('[data-cy="inset-text"]'),
  privacy: {
    intro: () => cy.get('[data-cy="privacy-intro"]'),
    notice: () => cy.get('[data-cy="privacy-notice"]'),
    noticeLink: () => cy.get('[data-cy="privacy-notice-link"]'),
  },
  continueSubmit: () => cy.get('[data-cy="continue-submit"]'),
};

export default eligibleToApplyOnlinePage;
